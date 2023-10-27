import UserModel from '@/models/user.model'
import { connect } from '@/utils/database.util'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from mongoDB to session
      const user = await UserModel.findOne({ email: session.user.email })
      session.user.id = user._id.toString()
      session.user.bookmarks = user.bookmarks
      return session
    },

    async signIn({
      user,
      account,
      profile
    }){
      try {
        await connect()

        // check if user already exists
        const user = await UserModel.findOne({ email: profile.email })

        // create a new user document in mongodb if user does not exist
        if (!user) {
          await UserModel.create({
            email: profile.email,
            displayName: profile.name,
            image: profile.picture
          })
        }

        return true
      } catch (error) {
        console.log('Error authenticating user ', error.message)
        return false
      }
    }
  }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
