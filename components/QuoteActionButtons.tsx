'use client'

import { Quote } from '@/typings'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
      <Image
        className='green_gradient cursor-pointer font-inter text-sm'
        onClick={handleEdit}
        src='/assets/icons/edit.svg'
        alt='edit button'
        width={25}
        height={25}
        />
      <Image
        className='green_gradient cursor-pointer font-inter text-sm'
        onClick={handleDelete}
        src='/assets/icons/delete.svg'
        alt='delete button'
        width={25}
        height={25}
      />
    </div>
  )
}

export default QuoteActionButtons
