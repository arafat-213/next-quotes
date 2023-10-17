import {NextRequest, NextResponse} from 'next/server'
import Quote from '@/models/quote.model'
import {connect} from '@/utils/database.util'

export const GET = async (req: NextRequest) => {
    try {
        await connect()
        const quotes = await Quote.find({}).populate('creator')
        return NextResponse.json({quotes}, {status: 200})
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotes' }, {status: 500})
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await connect()
        const {userId, quote, tag} = await req.json()

        const newQuote = new Quote({creator: userId, quote, tag})

        await newQuote.save()
        return NextResponse.json({newQuote}, {status: 201})

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create a quote' }, {status: 500})
    }
}