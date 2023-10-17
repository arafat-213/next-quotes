import React from 'react'
import QuoteCard from './QuoteCard'
import { Quote } from '@/typings'


const QuotesList = async () => {
  const data = await (await fetch(`${process.env.HOSTNAME}/api/quote`, {
    cache: 'no-store'
  })).json()

  return (
    <div className='quote_layout mt-16'>
      {data?.quotes?.map((quote: Quote) => (
        <QuoteCard quote={quote} key={quote._id}/>
      ))}
      
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
