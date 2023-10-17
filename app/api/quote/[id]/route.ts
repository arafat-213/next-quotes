import Quote from '@/models/quote.model'
import { connect } from '@/utils/database.util'
import { NextRequest, NextResponse } from 'next/server'

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
