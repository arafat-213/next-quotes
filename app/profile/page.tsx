import Profile from '@/components/Profile'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { MySession } from '@/typings'

const MyProfile = async () => {
  const session: MySession | null = await getServerSession(authOptions)
  
  const data = await (await fetch(`${process.env.HOSTNAME}/api/users/${session?.user.id}/quotes`, {
    cache: 'no-store'
  })).json()
  
  return (
    <Profile
      name='My Profile'
      desc='Welcome to your personalized profile page. Share your exceptional quotes and inspire others with the power of wisdom and words'
      data={data.quotes}
      isProfilePage={true}
    />
  )
}

export default MyProfile
