import './globals.css'
import type { Metadata } from 'next'
import NavigationBar from '@/components/Nav'
import Provider from '@/components/Provider'
import { Toaster } from 'react-hot-toast'

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
        <Toaster position='top-right' reverseOrder={false} />
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <NavigationBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
