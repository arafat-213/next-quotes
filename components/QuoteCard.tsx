import Image from 'next/image'
import React from 'react'
import CopyButton from './CopyButton'

const QuoteCard = () => {
	return (
		<div className='quote_card'>
			<div className='flex justify-between items-start gap-5'>
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
					<Image
						src='/assets/images/logo.svg'
						alt='user image'
						width={40}
						height={40}
						className='rounded-full object-contain'
					/>
					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-90'>
							Arafat Tai
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							tai.arafat.at@gmail.com
						</p>
					</div>
				</div>
                <div className="copy_btn">
                    <CopyButton />
                </div>
			</div>
            <p className='my-4 font-satoshi italic'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod similique incidunt praesentium architecto odit iste molestiae beatae veniam eius nisi.</p>
			<p className='font-inter text-sm blue_gradient cursor-pointer'>#Lorem #ipsum #dolor</p>
		</div>
	)
}

export default QuoteCard
