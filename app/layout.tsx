import './globals.css'
import type { Metadata } from 'next'
import NavigationBar from '@/components/Nav'

export const metadata: Metadata = {
	title: 'Quotocean',
	description: 'Discover & Share Inspirational Quotes'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<div className='main'>
					<div className='gradient' />
				</div>
				<main className='app'>
          <NavigationBar />
          {children}</main>
			</body>
		</html>
	)
}
