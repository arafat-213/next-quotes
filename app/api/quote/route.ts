import {NextRequest, NextResponse} from 'next/server'
import Quote from '@/models/quote.model'
import {connect} from '@/utils/database.util'

export const GET = async (req: NextRequest) => {
    try {
        connect()
        const quotes = await Quote.find({})
        return NextResponse.json({data: quotes}, {status: 200})
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch prompts' }, {status: 500})
    }
}