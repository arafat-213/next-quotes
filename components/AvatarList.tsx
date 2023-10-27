import React from "react";
import classNames from "classnames";
import Image from "next/image"

type Avatar = {
  image: string
}
const AvatarList = ({ avatars } : {avatars: [Avatar]}) => {
  return (
    <div className="flex items-center">
      {avatars?.slice(0,3)?.map((avatar: Avatar, index:  React.Key) => (
        <Image
          key={index}
          src={avatar.image}
          alt="Profile picture"
          height={25}
          width={25}
          className={classNames(
            "w-8 h-8 rounded-full",
            index === 0 && "ml-0",
            index !== 0 && "-ml-5"
          )}
        />
      ))}
    </div>
  );
};

export default AvatarList;