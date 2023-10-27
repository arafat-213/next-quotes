'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AvatarList from './AvatarList'
import toast from 'react-hot-toast'

type Props ={
  quoteId: string
  likes: [string]
}
const QuoteInteractButtons = ({quoteId, likes}: Props) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(likes?.some(like => like._id === session?.user?.id))
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
    if (likesList.some(like => like._id === session?.user?.id))
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
      if (error.request.status === 403)
        toast.error('You must be logged in to  perform this action')
      else
        toast.error('Something went wrong while performing this action')
    }
  }

  const handleBookmark = async () => {
    try {
      const {data} = await axios.post(`/api/user/bookmarks`, {
        quoteId
      })
      setBookmarks(data?.bookmarks)
    } catch (error) {
      if (error.request.status === 403)
        toast.error('You must be logged in to  perform this action')
      else
        toast.error('Something went wrong while performing this action')
    }
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
            handleLike()
          }
          }
        />
        <AvatarList avatars={likesList}/>
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
