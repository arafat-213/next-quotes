import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connect } from '@/utils/database.util'
import { ObjectId } from 'mongodb'

// GET /api/user/bookmarks
export const GET = async (request: NextRequest) => {
  try {
    await connect()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id)
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 403 }
      )

    const user = await User.findById(session?.user?.id).populate({
      path: 'bookmarks',
      populate: {
        path: 'creator'
      }
    })
    const bookmarkedQuotes = user.bookmarks
    return NextResponse.json(
      { quotes: bookmarkedQuotes },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// POST api/user/bookmarks
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id)
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 403 }
      )

    await connect()

    const { quoteId } = await request.json()

    const user = await User.findById(session?.user?.id)

    if (user?.bookmarks?.includes(quoteId)) {
      // User has already bookmarked this quote, remove the bookmark
      user.bookmarks = user?.bookmarks?.filter(
        (bookmark: ObjectId) => bookmark.toString() !== quoteId
      )
      await user.save()

    } else {
      user?.bookmarks.push(quoteId)
      await user.save()
    }

    return NextResponse.json({ bookmarks: user.bookmarks }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
