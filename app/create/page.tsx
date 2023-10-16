import QuoteForm from '@/components/QuoteForm'
import React from 'react'

const CreateQuote = () => {
    const submitAction = async () => {
        'use server'
        // TODO: Add a server action to handle the submit
    }
    
    return (
    <div><QuoteForm type='Create' onSubmit={submitAction}/></div>
  )
}

export default CreateQuote