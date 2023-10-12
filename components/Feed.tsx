import React from 'react'
import QuoteCard from './QuoteCard'

const QuotesList = () => {
	return (
		<div className='mt-16 quote_layout'>
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
