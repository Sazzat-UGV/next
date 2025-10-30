import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type SeeNavProps = {
    title: string
    className?: string
    href?: string

}

export default function SeeNav({ href, title, className }: SeeNavProps) {
    return (
        <div className={cn("flex justify-between mb-4 mt-9", className)}>
            <Button variant={"primary"} size={"lg"} className='bg-[#FFE4E4] text-blacks rounded-full cursor-default px-5'>{title}</Button>
            <Link href={href || ""}>
                <Button variant={"primary"} size={"lg"} className='bg-transparent rounded-full border text-reds border-reds px-3'>See all
                    <ArrowUpRight /></Button>
            </Link>
        </div>
    )
}
