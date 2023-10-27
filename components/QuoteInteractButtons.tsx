'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AvatarList from './AvatarList'
import toast from 'react-hot-toast'
import { Creator } from '@/typings'

type Props = {
  quoteId: string
  likes: [Creator]
  handleLike: (quoteId: string, userId: string) => Promise<void>
}
const QuoteInteractButtons = ({ quoteId, likes, handleLike }: Props) => {
  let { data: session , update} : {data: any, update: any} = useSession()
  const [isLiked, setIsLiked] = useState(
    likes?.some((like) => like._id === session?.user?.id)
  )
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    if (bookmarks?.includes(quoteId)) setIsBookmarked(true)
    else setIsBookmarked(false)
  }, [bookmarks, quoteId])

  useEffect(() => {
    if (likes.some((like) => like._id === session?.user?.id)) setIsLiked(true)
    else setIsLiked(false)
  }, [likes, session])

  useEffect(() => {
    setBookmarks(session?.user?.bookmarks)
  }, [session])

  const handleBookmark = async () => {
    try {
      const { data } = await axios.post(`/api/user/bookmarks`, {
        quoteId
      })
      setBookmarks(data?.bookmarks)
      // updates the session.user.bookmarks
      update()
    } catch (error : any) {
      if (error?.request?.status === 403)
        toast.error('You must be logged in to  perform this action')
      else toast.error('Something went wrong while performing this action')
    }
  }

  return (
    <div className='flex-between '>
      <div className='flex cursor-pointer items-center gap-2'>
        <Image
          src={
            isLiked
              ? '/assets/icons/heart_filled.svg'
              : '/assets/icons/heart.svg'
          }
          alt='copy button'
          width={25}
          height={25}
          onClick={() => {
            handleLike(quoteId, session?.user?.id)
          }}
        />
        <AvatarList avatars={likes} />
        <p className='font-inter text-sm text-gray-600'>
          {likes?.length > 1
            ? `${likes.length} Likes`
            : likes.length === 1
            ? '1 Like'
            : ''}
        </p>
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
        onClick={() => handleBookmark()}
      />
    </div>
  )
}

export default QuoteInteractButtons
