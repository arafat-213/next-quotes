import { Session } from "next-auth"
import { ReactNode } from "react"

export interface Quote{
  quote: string
  tag: string
  _id: string
  creator: {
    displayName: string
    email: string
    image: string
  }
}

export interface MySession extends Session {
  user: {
    name: string
    email: string
    image: string
    id: string
  }
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