import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select
const protectedPath = ['/bookmarks', '/profile', '/create', '/update']
export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          protectedPath.includes(req.nextUrl.pathname) &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)