import { cn } from '@/lib/utils'
import React from 'react'

type SubTitleProps = {
  title: string;
  className?: string;
  titleStyle?: string;
};

export default function SubTilte({ title, className, titleStyle }: SubTitleProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center pb-10",className)}>
      <h1 className={cn("text-3xl font-medium", titleStyle)}>{title}</h1>
    </div>
  );
}
