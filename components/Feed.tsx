import React from 'react'
import QuoteCard from './QuoteCard'

const QuotesList = ({ data }) => {
  return (
    <div className='quote_layout mt-16'>
      {data.map((quote) => (
        <QuoteCard quote={quote} key={quote._id}/>
      ))}
      
    </div>
  )
}
const Feed = ({ data }) => {
  return (
    <section className='feed'>
      <QuotesList data={data} />
    </section>
  )
}

export default Feed
