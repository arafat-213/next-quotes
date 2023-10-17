import Quote from '@/models/quote.model'
import { connect } from '@/utils/database.util'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connect()
    const quotes = await Quote.find({ creator: params.id }).populate('creator')
    
    if (!quotes)
      return NextResponse.json({ error: 'Quotes not found' }, { status: 404 })
    
      return NextResponse.json({ quotes }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Something went wrong while fetching the quotes' },
      { status: 500 }
    )
  }
}
