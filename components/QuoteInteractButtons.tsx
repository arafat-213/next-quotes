'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

type Props ={
  quoteId: string
  likes: [string]
}
const QuoteInteractButtons = ({quoteId, likes}: Props) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(likes?.includes(session?.user?.id || false))
  const [isBookmarked, setIsBookmarked] = useState(false)
  const handleLike = async () => {
    await axios.post(`/api/quote/${quoteId}/like`, {
      userId: session?.user?.id
    })

  }
  return (
    <div className='flex-between '>
      <div className='flex gap-2 items-center'>
        <Image
          src={
            likes?.includes(session?.user?.id)
              ? '/assets/icons/heart_filled.svg'
              : '/assets/icons/heart.svg'
          }
          alt='copy button'
          width={25}
          height={25}
          onClick= {() => {
            setIsLiked((isLiked) => !isLiked)
            handleLike()
          }
          }
        />
        <p className='font-inter text-sm text-gray-600'>{likes?.length > 1 ? `${likes.length} Likes` : likes.length === 1 ?  '1 Like' : ''}</p>
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
