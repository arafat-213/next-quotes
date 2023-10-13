import Form from '@/components/Form'
import React from 'react'

const CreateQuote = () => {
    const submitAction = async () => {
        'use server'
        // TODO: Add a server action to handle the submit
    }
    
    return (
    <div><Form type='Create' onSubmit={submitAction}/></div>
  )
}

export default CreateQuote