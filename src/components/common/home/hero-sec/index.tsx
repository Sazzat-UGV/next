import Image from 'next/image'
import React from 'react'
import bgImg from "@/assets/bg-img.png"
import Navber from '@/components/shared/navber'


export default function HeroSec() {
  return (
    <div className="relative min-h-96 w-full">
      <Image
        src={bgImg}
        alt="title"
        fill
        className="object-cover z-0"
      />
      <Navber />
      <div>
      </div>
    </div>
  )
}
