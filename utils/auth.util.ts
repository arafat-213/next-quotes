import jwt from 'jsonwebtoken'

export function getLoggedInUserFromToken(token: string) {
    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return decodedToken
    } catch (error: any) {
        throw new Error(error.message)
    }
}