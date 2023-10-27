'use client'
import Profile from '@/components/Profile'
import { MySession, Quote } from '@/typings'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const MyProfile = () => {
  
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])
  const {data:session} : {data: any}= useSession();

  const fetchQuotes = async () => {
    try {
      if (session) {
        const res = await fetch(`/api/users/${session?.user.id}/quotes`)
        const { quotes } = await res.json()        
        setAllQuotes(quotes)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  useEffect(() => {
    fetchQuotes()
  }, [session])
  
  return (
    <Profile
      name='My Profile'
      desc='Welcome to your personalized profile page. Share your exceptional quotes and inspire others with the power of wisdom and words'
      isProfilePage={true}
      allQuotes={allQuotes}
      setAllQuotes={setAllQuotes}
    />
  )
}

export default MyProfile
