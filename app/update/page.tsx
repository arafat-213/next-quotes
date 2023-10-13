import Form from '@/components/Form'
import React from 'react'

const Update = () => {
    const submitAction = async () => {
        'use server'
        // TODO: Add a server action to handle the submit
    }
    
    return (
    <div><Form type='Edit' onSubmit={submitAction}/></div>
    )
}

export default Update