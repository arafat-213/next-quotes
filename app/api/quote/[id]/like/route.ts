import Quote from '@/models/quote.model'
import { ObjectId } from 'mongoose'
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
    let quote = await Quote.findById(params.id)
    if (!quote) {
      return NextResponse.json(
        { error: 'Error while liking the quote' },
        { status: 404 }
      )
    }

    if (quote?.likes?.includes(userId)) {
      // User has already liked this quote, unlike it
      quote.likes = quote?.likes?.filter((like: ObjectId) => like.toString() !== userId)
      await quote.save()
    
      // return NextResponse.json({ likes: quote.likes }, { status: 200 })
    } else {
      // Like the quote
      quote?.likes?.push(userId)
      await quote.save()
      // return NextResponse.json({ likes: quote.likes }, { status: 200 })
    }

    quote = await quote.populate({
      path: 'likes',
      select: ['_id', 'displayName', 'email', 'image']
    })

    return NextResponse.json({ likes: quote.likes }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error while liking the quote' },
      { status: 500 }
    )
  }
}
