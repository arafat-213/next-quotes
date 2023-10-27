'use client'
import Profile from '@/components/Profile'
import React from 'react'
import { Quote } from '@/typings'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    params: {
        id: string,
    };
    searchParams: { [key: string]: string };
  };

const UserProfile = ({params, searchParams}: Props) => {
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])
  const fetchQuotes = async () => {
    try {
        const res = await fetch(`/api/users/${params.id}/quotes`)
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
    name= {searchParams.name}
    desc = {`Welcome to ${searchParams.name.split(" ")[0]}'s profile page. Explore ${searchParams.name.split(" ")[0]}'s exceptional quotes and be inspired by the power of their words`}
    allQuotes={allQuotes}
    setAllQuotes={setAllQuotes}
    isProfilePage={true} />
  )
}

export default UserProfile