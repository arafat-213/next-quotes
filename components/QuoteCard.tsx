'use client'

import Image from 'next/image'
import React from 'react'
import CopyButton from './CopyButton'
import { Quote } from '@/typings'
import Link from 'next/link'
import QuoteActionButtons from './QuoteActionButtons'
import QuoteInteractButtons from './QuoteInteractButtons'
import {useSession} from 'next-auth/react'

const QuoteCard = ({
  quote,
  isProfilePage = false,
  handleTagClick
}: {
  quote: Quote
  isProfilePage?: boolean
  handleTagClick?: (tagName: string) => void
}) => {
  const {data:session} = useSession()
  return (
    <div className='quote_card group'>
      <div className='flex items-start justify-between gap-2'>
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
        <div className='copy_btn opacity-0 group-hover:opacity-100'>
          <CopyButton />
        </div>
      </div>
      <p className='my-4 mt-1 font-satoshi italic'>{quote.quote}</p>
      <p className='blue_gradient cursor-pointer font-inter text-sm space-x-1'>
        {quote.tag?.split(' ').map((tag, i) => <span key={i} className='tag' onClick={() => !isProfilePage && handleTagClick(tag)}>{tag}{' '}</span>)}
      </p>
      <div className='opacity-0 group-hover:opacity-100'>
        {isProfilePage && session?.user.id === quote.creator._id && (
          <QuoteActionButtons quote={quote} />
        )}
      </div>
      <div className='mt-4'>
      <QuoteInteractButtons quoteId={quote._id} likes={quote?.likes}/>
      </div>
    </div>
  )
}

export default QuoteCard
