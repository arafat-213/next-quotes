import React from 'react'
import QuoteCard from './QuoteCard'

type ProfileProps = {
  name: String
  desc: String
}

const Profile = ({ name, desc }: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='quote_layout mt-10'>
        <QuoteCard />
        <QuoteCard />
        <QuoteCard />
        <QuoteCard />
        <QuoteCard />
      </div>
    </section>
  )
}

export default Profile
