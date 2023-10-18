import { Schema, model, models } from 'mongoose'

const QuoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quote: {
    type: String,
    required: [true, 'Quote is required']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required']
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const Quote = models.Quote || model('Quote', QuoteSchema)

export default Quote
