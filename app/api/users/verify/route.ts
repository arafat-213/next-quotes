import { getLoggedInUserFromToken } from "@/utils/auth.util"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value || null
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 403})
        }
        const user = await getLoggedInUserFromToken(token)
        return NextResponse.json({user}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Something went wrong'}, {status:500})
    }
}