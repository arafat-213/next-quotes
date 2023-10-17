import React from 'react'
import QuoteCard from './QuoteCard'
import { ProfileProps } from '@/typings'

const Profile = async ({ name, desc, data }: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='quote_layout mt-10'>
        {data.map(quote => <QuoteCard quote={quote} key={quote._id}/>)}
      </div>
    </section>
  )
}

export default Profile
