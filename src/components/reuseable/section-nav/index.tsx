import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

type SectionNavProps = {
    className?: string;
    title: string;
    src: string;
    titleStyle?:string
    imgStyle?:string
    imgStyles?:string
};

export default function SectionNav({ title, src,className ,titleStyle,imgStyle,imgStyles}: SectionNavProps) {
    return (
        <div className={cn("mb-10", className)}>
            <div className={cn("relative overflow-hidden size-48 m-auto",imgStyle)}>
                <Image
                    src={src}
                    alt={title}
                    fill
                    className={cn("object-cover object-left-top",imgStyles)}
                    quality={100}
                />
            </div>
            <div className={cn("py-3 px-5 m-auto bg-white rounded-xl text-xl lg:text-2xl text-center font-medium w-full max-w-xl text-blacks",titleStyle)}>
                {title}
            </div>
        </div>
    );
}
