import Profile from '@/components/Profile'
import React from 'react'
import { headers } from "next/headers"


const Bookmarks = async () => {
  const data = await (
    await fetch(`${process.env.HOSTNAME}/api/user/bookmarks`, {
        cache: 'no-store',
        headers: Object.fromEntries(headers())
    })
  ).json()
  return (
    <Profile
      name='My Bookmarks'
      desc='Welcome to your bookmarked quotes. Share your exceptional quotes and inspire others with the power of wisdom and words'
      data={data.quotes}
    />
  )
}

export default Bookmarks
