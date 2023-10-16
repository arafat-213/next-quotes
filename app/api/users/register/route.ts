import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/utils/database.util'
import User from '@/models/user.model'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    connect()
    const reqBody = await request.json()
    const { email, password, displayName } = reqBody
    // check if the user exists
    const user = await User.findOne({ email })
    if (user)
      return NextResponse.json(
        { error: 'Email is already in use' },
        { status: 400 }
      )

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    // create a new user
    const newUser = new User({ email, displayName, password: hashedPassword })

    // save the new user to the database
    const savedUser = await newUser.save()

    // create token data
    const tokenData = {
      id: savedUser._id,
      displayName: savedUser.displayName,
      email: savedUser.email
    }

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d'
    })

      // send the token in a cookie
      const res = NextResponse.json({
        message: 'Signup successful',
        success: true,
        token,
        user: {...savedUser.toObject(), password: null}
      }, {status: 201})
  
      res.cookies.set('auth-token', token, { httpOnly: true })
      return res
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message })
  }
}
