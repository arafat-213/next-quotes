import React, { useState } from 'react'
import QuoteCard from './QuoteCard'
import { ProfileProps, Quote } from '@/typings'

const Profile = ({ name, desc, allQuotes, setAllQuotes, isProfilePage }: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='quote_layout mt-10'>
        {allQuotes.map(quote => <QuoteCard quote={quote} key={quote._id} isProfilePage={isProfilePage} setAllQuotes={setAllQuotes}/>)}
      </div>
    </section>
  )
}

export default Profile
