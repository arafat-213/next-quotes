'use client'

import { MyProviderProps } from '@/typings'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }: MyProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
)

export default Provider
