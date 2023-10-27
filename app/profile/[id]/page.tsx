import Profile from '@/components/Profile'
import React from 'react'

type Props = {
    params: {
        id: string,
    };
    searchParams: { [key: string]: string };
  };

const UserProfile = async ({params, searchParams}: Props) => {
    const data = await (await fetch(`${process.env.HOSTNAME}/api/users/${params.id}/quotes`, {
        cache: 'no-store'
      })).json()
  return (
    <Profile
    name= {searchParams.name}
    desc = {`Welcome to ${searchParams.name.split(" ")[0]}'s profile page. Explore ${searchParams.name.split(" ")[0]}'s exceptional quotes and be inspired by the power of their words`}
    data= {data.quotes}
    isProfilePage={true} />
  )
}

export default UserProfile