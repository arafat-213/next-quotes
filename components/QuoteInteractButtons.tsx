'use client'

import Image from 'next/image'
import { useState } from 'react'

const QuoteInteractButtons = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className='flex-between '>
      <div className='flex gap-2 items-center'>
        <Image
          src={
            isLiked
              ? '/assets/icons/heart_filled.svg'
              : '/assets/icons/heart.svg'
          }
          alt='copy button'
          width={25}
          height={25}
          onClick= {() => setIsLiked((isLiked) => !isLiked)}
        />
        <p className='font-inter text-sm text-gray-600'>20 Likes</p>
      </div>

      <Image
          src={
            isBookmarked
              ? '/assets/icons/bookmark_filled.svg'
              : '/assets/icons/bookmark.svg'
          }
          alt='save button'
          width={25}
          height={25}
          onClick= {() => setIsBookmarked((isBookmarked) => !isBookmarked)}
        />
    </div>
  )
}

export default QuoteInteractButtons
