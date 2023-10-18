import QuoteForm from '@/components/QuoteForm'
import axios from 'axios' 
import { redirect } from 'next/navigation'


type Props = {
    searchParams: { [key: string]: string };
  };
const UpdateQuote = async ({searchParams}: Props) => {
    let quote = undefined
    try {
        const {data} = await axios.get(`${process.env.HOSTNAME}/api/quote/${searchParams.id}`)
        quote = data.quote        
        if (!quote) {
            redirect('/')
        }
    } catch (error) {
        console.log(error)
        redirect('/')
    }

    return (
    <div><QuoteForm type='Edit' quote={quote} /></div>
    )
}

export default UpdateQuote