import Image from 'next/image'
import React from 'react'
import CopyButton from './CopyButton'

const QuoteCard = async ({quote}) => {
  return (
    <div className='quote_card'>
      <div className='flex items-start justify-between gap-5'>
        <div className='flex flex-1 cursor-pointer items-center justify-start gap-3'>
          <Image
            src={quote?.creator?.image}
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
        </div>
        <div className='copy_btn'>
          <CopyButton />
        </div>
      </div>
      <p className='my-4 mt-1 font-satoshi italic'>
        {quote.quote}
      </p>
      <p className='blue_gradient cursor-pointer font-inter text-sm'>
        {quote.tag}
      </p>
    </div>
  )
}

export default QuoteCard
