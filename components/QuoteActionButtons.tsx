'use client'

import { Quote } from '@/typings'
import React from 'react'
import { useRouter } from 'next/navigation'

const QuoteActionButtons = ({ quote }: { quote: Quote }) => {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/update?id=${quote._id}`)
  }

  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this quote?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/quote/${quote._id.toString()}`, {
          method: 'DELETE'
        })
        // refresh is necessary to ensure the quote is remove from the UI
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className='flex-center mt-5 gap-4 border-t border-gray-200 pt-3'>
      <p
        className='green_gradient cursor-pointer font-inter text-sm'
        onClick={handleEdit}
      >
        Edit
      </p>
      <p
        className='orange_gradient cursor-pointer font-inter text-sm'
        onClick={handleDelete}
      >
        Delete
      </p>
    </div>
  )
}

export default QuoteActionButtons
