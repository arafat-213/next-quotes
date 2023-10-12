import Feed from "@/components/Feed"

export default function Home() {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Discover & Share{' '}
				<br className='max-md:hidden' />
				<span className='orange_gradient text-center'>
          {/* TODO: Add Typed.JS for this span */}
				  Inspirational Quotes
				</span>
			</h1>
      <p className="desc text-center">
        <span className="font-semibold">QuotOcean</span> is an open source Quotes pool for the world to discover, create and share Inspirational and Motivational quotes
      </p>
      <Feed />
		</section>
	)
}
