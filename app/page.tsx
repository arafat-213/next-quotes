import Feed from '@/components/Feed'
import TypedText from '@/components/TypedText'

export default async function Home() {  
  return (
    <section className='flex-center w-full flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>
            <TypedText />
            Quotes
        </span>
      </h1>
      <p className='desc text-center'>
        <span className='font-semibold'>QuotOcean</span> is an open source
        Quotes pool for the world to explore, create, and share amazing quotes
      </p>
      <Feed/>
    </section>
  )
}
