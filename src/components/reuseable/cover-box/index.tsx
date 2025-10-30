import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import Icon from '@/icon';
import Image from 'next/image'
import React from 'react'

interface CoverBoxProps {
  name?: string;
  edit?: boolean;
}

export default function CoverBox({ name, edit}: CoverBoxProps) {
  return (
    <div className="relative h-48 md:h-64">
      <Image
        src={"https://surl.li/lzklum"}
        alt="Cover image"
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
      <div className='absolute bottom-0 left-15 translate-y-1/2 '>
        <div className='relative'>
        <Avatar className="size-24  shadow-md">
          <AvatarImage src={"https://doctors-next14.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile2.0440e650.jpg&w=1920&q=75"} alt="Profile picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {name && (<h2 className="text-xl font-semibold text-blacks">Haircut Pro</h2>)}
        {edit && (
            <div className='size-8 absolute cursor-pointer grid place-items-center rounded-full  bottom-0 right-0 bg-reds'>
                <Icon width={16} name="cameraWhite"/>
            </div>
        )}
        </div>
      </div>
    </div>
  )
}
