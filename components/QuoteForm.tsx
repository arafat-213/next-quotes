import Link from 'next/link'
import { cookies } from 'next/headers'
import { getLoggedInUserFromToken } from '@/utils/auth.util'
import { redirect } from 'next/navigation'
import axios from 'axios'

type FormProps = {
  type: String
}
const QuoteForm = ({ type }: FormProps) => {
  const submitAction = async (formData: FormData) => {
    'use server'
    try {
      const cookieStore = cookies()
      const token = cookieStore?.get('auth-token')?.value || ''
      const user = await getLoggedInUserFromToken(token)
      await axios.post(`${process.env.HOSTNAME}/api/quote`, {
        userId: user.id,
        quote: formData.get('quote'),
        tag: formData.get('tag')
      })
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
