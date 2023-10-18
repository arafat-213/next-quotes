import Quote from '@/models/quote.model'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await request.json()
    if (!userId) {
        return NextResponse.json({error: 'Unauthorised'}, {status: 403})
    }
    const quote = await Quote.findById(params.id)
    if (!quote) {
      return NextResponse.json(
        { error: 'Error while liking the quote' },
        { status: 404 }
      )
    }

    if (quote?.likes?.includes(userId)) {
      // User has already liked this quote, unlike it
      quote.likes = quote?.likes?.filter((like) => like.toString() !== userId)
      await quote.save()
    
      return NextResponse.json({ quote }, { status: 200 })
    } else {
      // Like the quote
      const updatedQuote = await Quote.findByIdAndUpdate(
        params.id,
        {
          $push: { likes: userId }
        },
        { new: true }
      )
      return NextResponse.json({ quote: updatedQuote }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error while liking the quote' },
      { status: 500 }
    )
  }
}
