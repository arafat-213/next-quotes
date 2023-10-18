import Link from 'next/link'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Quote } from '@/typings'

type FormProps = {
  type: String
  quote?: Quote
}

const QuoteForm = ({ type, quote }: FormProps) => {
  const submitAction = async (formData: FormData) => {
    'use server'
    try {
      const session = await getServerSession(authOptions)
      if (type === 'Edit' && quote) {
        // update form
        await axios.patch(`${process.env.HOSTNAME}/api/quote/${quote?._id}`, {
          quote: formData.get('quote'),
          tag: formData.get('tag')
        })
      } else {
        //create form
        await axios.post(`${process.env.HOSTNAME}/api/quote`, {
          userId: session?.user?.id,
          quote: formData.get('quote'),
          tag: formData.get('tag')
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      redirect('/')
    }
  }
  return (
    <section className='flex-start w-full max-w-full flex-col'>
      <h1 className='head_text blue_gradient text-left'>
        <span className='blue_gradient'>{type} Quote</span>
      </h1>
      <p className='desc text-left'>
        {type} and share amazing quotes with the world and inspire them through
        the wisdom of words and thoughts
      </p>

      <form
        action={submitAction}
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'
      >
        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Your Quote
          </span>
          <textarea
            placeholder='Write your quote here'
            className='form_textarea'
            name='quote'
            defaultValue={quote? quote.quote: ''}
          />
        </label>

        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Quote Category{' '}
            <span className='font-normal'>
              (#inspirational, #finance, #wisdom, #motivational)
            </span>
          </span>
          <input
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
            name='tag'
            defaultValue={quote ? quote.tag: ''}
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-sm text-gray-500'>
            Cancel
          </Link>
          <button
            type='submit'
            className='rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white'
          >
            {type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default QuoteForm
