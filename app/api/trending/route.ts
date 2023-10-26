import Quote from '@/models/quote.model'
import { NextResponse, NextRequest } from 'next/server'

function findTop5Tags(tags: string[]): string[] {
  // Create an object to store the frequency of each word.
  const frequencyMap: { [tag: string]: number } = {}

  // Iterate over the array and add each word to the object, incrementing the count for that word each time.
  for (const tag of tags) {
    if (!frequencyMap[tag]) {
      frequencyMap[tag] = 0
    }
    frequencyMap[tag]++
  }

  // Sort the object by the frequency of each word, in descending order.
  const sortedFrequencyMap = Object.entries(frequencyMap).sort(
    (a, b) => b[1] - a[1]
  )

  // Return the top 5 most repeated words from the sorted object.
  return sortedFrequencyMap.slice(0, 5).map(([tag]) => tag)
}

export const GET = async () => {
  const last24Hours = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)

  try {
    const latestQuotes = await Quote.find({
      _createdAt: { $gte: last24Hours }
    })

    const tags = latestQuotes.map((quote) => quote.tag.split(' ')).flat()

    const trendingTags = findTop5Tags(tags)

    return NextResponse.json({ tags: trendingTags }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Something went wrong while fetching treding tags'}, {status: 500})
  }
}
