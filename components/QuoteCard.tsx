import Image from 'next/image'
import React from 'react'
import CopyButton from './CopyButton'

const QuoteCard = () => {
  return (
    <div className='quote_card'>
      <div className='flex items-start justify-between gap-5'>
        <div className='flex flex-1 cursor-pointer items-center justify-start gap-3'>
          <Image
            src='/assets/images/logo.svg'
            alt='user image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='text-gray-90 font-satoshi font-semibold'>
              Arafat Tai
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              tai.arafat.at@gmail.com
            </p>
          </div>
        </div>
        <div className='copy_btn'>
          <CopyButton />
        </div>
      </div>
      <p className='my-4 mt-1 font-satoshi italic'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod similique
        incidunt praesentium architecto odit iste molestiae beatae veniam eius
        nisi.
      </p>
      <p className='blue_gradient cursor-pointer font-inter text-sm'>
        #Lorem #ipsum #dolor
      </p>
    </div>
  )
}

export default QuoteCard
