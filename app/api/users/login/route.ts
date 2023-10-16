import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connect } from '@/utils/database.util'


export async function POST(request: NextRequest) {
  try {
    connect()
    const reqBody = await request.json()

    const { email, password } = reqBody

    // check if the use exists
    const user = await User.findOne({ email })

    if (!user)
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      ) 

    // check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 400 }
      )

    // create token data
    const tokenData = {
      id: user._id,
      displayName: user.displayName,
      email: user.email
    }

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d'
    })

    // send the token in a cookie
    const res = NextResponse.json({
      message: 'Login successful',
      success: true,
      user: {...user.toObject(), password: null}
    })

    res.cookies.set('auth-token', token, { httpOnly: true })

    return res
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
