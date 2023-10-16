import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const SignupForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  })

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      const url = `/api/users/register`
      const res = await axios.post(url, formData)
      console.log(res)
      if (res.status == 201) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='flex-start w-full max-w-full flex-col'>
      <h1 className='head_text blue_gradient text-left'>
        <span className='blue_gradient'>Sign up</span>
      </h1>
      <p className='desc text-left'>
        and start sharing amazing quotes with the world and inspire them
        through the wisdom of words and thoughts
      </p>

      <form
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'
        method='POST'
      >
        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Email
          </span>
          <input
            type='text'
            className='form_input'
            placeholder='Enter your email here'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Display Name
          </span>
          <input
            type='text'
            className='form_input'
            placeholder='Enter your full name here'
            name='displayName'
            value={formData.displayName}
            onChange={handleChange}
          />
        </label>

        <label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Password
          </span>
          <input
            type='password'
            className='form_input'
            placeholder='Enter your password here'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-sm text-gray-500'>
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className='rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white'
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignupForm
