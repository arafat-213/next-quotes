import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: [true, 'Email is already used!']
  },
  displayName: {
    type: String,
    required: [true, 'Username is required!']
  },
  image: {
    type: String
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ]
})

const User = models.User || model('User', userSchema)

export default User