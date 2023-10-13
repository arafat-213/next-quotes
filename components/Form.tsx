import Link from 'next/link'
import React from 'react'

type FormProps = {
  type: String
  onSubmit: () => Promise<void>
}
const Form = ({ type, onSubmit }: FormProps) => {
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
        action={onSubmit}
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'
      >
        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Your Quote
          </span>
          <textarea
            placeholder='Write your quote here'
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Quote Category{' '}
            <span className='font-normal'>(#inspirational, #finance, #wisdom, #motivational)</span>
          </span>
          <input 
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm' > 
          Cancel
          </Link>
          <button type='submit' className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
