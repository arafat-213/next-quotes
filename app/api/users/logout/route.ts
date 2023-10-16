import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout succesful",
            success: true            
        })

        // clear token from cookie
        response.cookies.set("auth-token", "", {httpOnly: true, expires: new Date(0)})

        // return the response
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
    }
} 