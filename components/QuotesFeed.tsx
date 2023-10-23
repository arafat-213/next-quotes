'use client'
import { Quote } from '@/typings'
import React, { ChangeEvent, useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'
import Image from 'next/image'

const QuotesCardsList = ({
  data,
  handleTagClick
}: {
  data: Quote[]
  handleTagClick: (tagName: string) => void
}) => {
  return (
    <div className='quote_layout mt-16'>
      {data?.map((quote: Quote) => (
        <QuoteCard
          quote={quote}
          key={quote._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const QuotesFeed = () => {
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])

  // Search states
  const [searchText, setSearchText] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
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
    const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
    return allQuotes.filter(
      (item: Quote) =>
        regex.test(item.creator.displayName) ||
        regex.test(item.tag) ||
        regex.test(item.quote)
    )
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const searchResult = filterQuotes(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          required
          className='block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-5 pr-12 font-satoshi text-sm font-medium shadow-lg focus:border-blue-500 focus:outline-none focus:ring-0'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
        />
        {searchText && (
          <button
            type='button'
            className='absolute right-0 top-0 mr-2 mt-2'
            onClick={() => setSearchText('')}
          >
            <Image
              src='/assets/icons/clear_search.svg'
              alt='clear search'
              width={25}
              height={25}
            />
          </button>
        )}
      </form>
      <QuotesCardsList
        data={searchText ? searchedResults : allQuotes}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default QuotesFeed
