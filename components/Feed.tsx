import React from 'react'
import QuoteCard from './QuoteCard'

const QuotesList = () => {
  return (
    <div className='quote_layout mt-16'>
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
    </div>
  )
}
const Feed = () => {
  return (
    <section className='feed'>
      <QuotesList />
    </section>
  )
}

export default Feed
