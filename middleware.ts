import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // check if it is a public path
    const publicPaths = [
        '/login',
        '/register',
        '/'
    ]

    const isPublicPath = publicPaths.includes(path)
    
    // Get the token from the cookies
    const token = request.cookies.get('auth-token')?.value || ''

    // redirect to the login page if token is not present or it is not a public path
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // redirect to the home page if token is present and it is a public path
    if (token && isPublicPath && path !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/', '/profile', '/login', '/register', '/create', '/update']
}