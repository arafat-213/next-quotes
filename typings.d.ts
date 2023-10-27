import { Session, User } from 'next-auth'
import { ReactNode } from 'react'

export interface Quote {
  quote: string
  tag: string
  _id: string
  creator: Creator
  likes: [Creator]
}

interface Creator {
  displayName: string
  email: string
  image: string
  _id: string
}

interface MySession extends Session {
  user: ExtendedUser
}

interface ExtendedUser extends User {
  id: string | null | undefined
}

export interface MyProfile extends Profile {
  picture: string
  email: string
  name: string
}

export interface MyProviderProps {
  children: ReactNode
  session?: Session
}

export interface ProfileProps {
  name: String
  desc: String
  allQuotes: Quote[]
  setAllQuotes: Dispatch<SetStateAction<Quote[]>>
  isProfilePage?: boolean
}
