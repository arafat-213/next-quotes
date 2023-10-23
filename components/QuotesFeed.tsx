'use client'
import { Quote } from '@/typings'
import React, { useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'

const QuotesCardsList = ({ data }: { data: Quote[] }) => {
  return (
    <div className='quote_layout mt-16'>
      {data?.map((quote: Quote) => <QuoteCard quote={quote} key={quote._id} />)}
    </div>
  )
}
const QuotesFeed = () => {
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [searchedResults, setSearchedResults] = useState<Quote[]>([])

  const fetchQuotes = async () => {
    const res = await fetch('api/quote')
    const { quotes } = await res.json()
    setAllQuotes(quotes)
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const filterQuotes = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allQuotes.filter(
      (item: Quote) =>
        regex.test(item.creator.displayName) ||
        regex.test(item.tag) ||
        regex.test(item.quote)
    );
  };

  const handleSearchChange = (e) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input type='text' required className='search_input' placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}/>
      </form>
      <QuotesCardsList data={searchText? searchedResults : allQuotes} />
    </section>
  )
}

export default QuotesFeed
