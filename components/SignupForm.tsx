'use client'

import Link from 'next/link'

const SignupForm = () => {
  return (
    <section className='flex-start w-full max-w-full flex-col'>
    <h1 className='head_text blue_gradient text-left'>
      <span className='blue_gradient'>Sign up</span>
    </h1>
    <p className='desc text-left'>
      Signup and start sharing amazing quotes with the world and inspire them
      through the wisdom of words and thoughts
    </p>

    <form className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'>
      <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>Email</span>
          <input type='text' className='form_input' placeholder='Enter your email here'/>
      </label>

      <label>
            <span className='font-satoshi text-base font-semibold text-gray-700'>Email</span>
            <input type='text' className='form_input' placeholder='Enter your email here'/>
        </label>

      <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>Password</span>
          <input type='password' className='form_input' placeholder='Enter your password here'/>
      </label>

      <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href='/' className='text-gray-500 text-sm' > 
        Cancel
        </Link>
        <button type='submit' className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
          Sign up
        </button>
      </div>
    </form>
  </section>
  )
}

export default SignupForm