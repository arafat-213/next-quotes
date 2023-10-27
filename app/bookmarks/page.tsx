'use client'
import Profile from '@/components/Profile'
import React from 'react'
import { Quote } from '@/typings'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



const Bookmarks = () => {
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])
  const fetchQuotes = async () => {
    try {
        const res = await fetch(`/api/user/bookmarks`)
        const { quotes } = await res.json()        
        setAllQuotes(quotes)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])
  return (
    <Profile
      name='My Bookmarks'
      desc='Welcome to your bookmarked quotes. Share your exceptional quotes and inspire others with the power of wisdom and words'
      allQuotes={allQuotes}
      setAllQuotes={setAllQuotes}
    />
  )
}

export default Bookmarks
