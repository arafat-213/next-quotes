'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from 'next-auth/providers/index'

const NavigationBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const { data: session }  = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  
  
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
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
             <Link href='/bookmarks' className='black_btn'>
              Bookmarks
            </Link>

            <Link href='/create' className='black_btn'>
              Create Quote
            </Link>

            <button type='button' className='outline_btn' onClick={() => signOut()}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className='black_btn'
              >
                Sign in
              </button>
            ))}
        </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='relative flex sm:hidden'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image}
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
                  href='/create'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link
                  href='/bookmarks'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Bookmarks
                </Link>
                <button type='button' className='black_btn mt-5 w-full' onClick={() => signOut()}>
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
