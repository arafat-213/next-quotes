'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props ={
  quoteId: string
  likes: [string]
}
const QuoteInteractButtons = ({quoteId, likes}: Props) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(likes?.includes(session?.user?.id || false))
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [likesList, setLikesList] = useState<string[]>([])

  useEffect(() => {
    if (bookmarks?.includes(quoteId))
      setIsBookmarked(true)
    else 
      setIsBookmarked(false)
  }, [bookmarks, quoteId])

  useEffect(() => {
    if (likesList.includes(session?.user?.id))
      setIsLiked(true)
    else
      setIsLiked(false)
  }, [likesList, session])

  useEffect(() => {
    setBookmarks(session?.user?.bookmarks)
  }, [session])

  useEffect(() => {
    setLikesList(likes)
  }, [likes])
 
  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/quote/${quoteId}/like`, {
        userId: session?.user?.id
      })
      setLikesList(data.likes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBookmark = async () => {
    const {data} = await axios.post(`/api/user/bookmarks`, {
      quoteId
    })
    setBookmarks(data?.bookmarks)
  }

  return (
    <div className='flex-between '>
      <div className='flex gap-2 items-center cursor-pointer'>
        <Image
          src={
            isLiked
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
        <p className='font-inter text-sm text-gray-600'>{likesList?.length > 1 ? `${likesList.length} Likes` : likesList.length === 1 ?  '1 Like' : ''}</p>
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
          className='cursor-pointer'
          onClick= {() => handleBookmark()}
        />
    </div>
  )
}

export default QuoteInteractButtons
