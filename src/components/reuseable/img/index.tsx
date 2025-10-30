import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface ImgProps {
    src: string;
    title: string;
    className?: string;
    imgStyle?: string;
}

const Img = ({
    src,
    title,
    className = '',
    imgStyle = '',
}: ImgProps) => {
    return (
        <div className={cn("relative w-40 h-11 rounded-full overflow-hidden", className)}>
            <Image
                src={src}
                alt={title}
                fill
                className={cn("object-cover", imgStyle)}
            />
        </div>
    );
};

export default Img;
