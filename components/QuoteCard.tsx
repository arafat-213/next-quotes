import Image from 'next/image'
import React from 'react'
import CopyButton from './CopyButton'
import { MySession, Quote } from '@/typings'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import QuoteActionButtons from './QuoteActionButtons'

const QuoteCard = async ({
  quote,
  isProfilePage = false
}: {
  quote: Quote
  isProfilePage?: boolean
}) => {
  const session: MySession | null = await getServerSession(authOptions)
  return (
    <div className='quote_card'>
      <div className='flex items-start justify-between gap-5'>
        <Link
          className='flex flex-1 cursor-pointer items-center justify-start gap-3'
          href={
            session?.user.id === quote.creator._id
              ? '/profile'
              : `/profile/${quote?.creator._id}?name=${quote?.creator.displayName}`
          }
        >
          <Image
            src={quote.creator.image}
            alt='user image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='text-gray-90 font-satoshi font-semibold'>
              {quote.creator.displayName}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {quote.creator.email}
            </p>
          </div>
        </Link>
        <div className='copy_btn'>
          <CopyButton />
        </div>
      </div>
      <p className='my-4 mt-1 font-satoshi italic'>{quote.quote}</p>
      <p className='blue_gradient cursor-pointer font-inter text-sm'>
        {quote.tag}
      </p>

      {isProfilePage && session?.user.id === quote.creator._id && (
        <QuoteActionButtons quote={quote} />
      )}
    </div>
  )
}

export default QuoteCard
