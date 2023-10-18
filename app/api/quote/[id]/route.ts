import Quote from '@/models/quote.model'
import { connect } from '@/utils/database.util'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connect()

    const quote = await Quote.findById(params.id).populate('creator')

    if (!quote)
      return NextResponse.json({ message: 'Quote not found' }, { status: 404 })

    return NextResponse.json({ quote }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error getting quote' }, { status: 500 })
  }
}

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { quote, tag } = await request.json()
  try {
    await connect()

    const updatedQuote = await Quote.findByIdAndUpdate(params.id, {
      quote,
      tag
    })

    if (!updatedQuote)
      return NextResponse.json({ message: 'Quote not found' }, { status: 404 })

    return NextResponse.json(
      { message: 'Quote updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Error updating quote' }, { status: 500 })
  }
}
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connect()

    await Quote.findByIdAndRemove(params.id)

    return NextResponse.json(
      { message: 'Quote deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error deleting quote' }, { status: 500 })
  }
}
