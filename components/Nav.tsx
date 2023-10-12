'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NavigationBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
      <Link href='/' className='flex-center flex gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>QuotOcean</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {isLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-quote' className='black_btn'>
              Create Quote
            </Link>

            <button type='button' className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <button type='button' className='black_btn'>
            Sign in
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='relative flex sm:hidden'>
        {isLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='cursor-pointer rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button type='button' className='black_btn mt-5 w-full'>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button type='button' className='black_btn'>
            Sign in
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavigationBar
