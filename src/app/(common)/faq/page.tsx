import FqaBox from '@/components/view/fqa'
import { Seo } from '@/lib';
import { Metadata } from 'next';
import React from 'react'



export const metadata: Metadata = Seo({
  title: "FAQ - Frequently Asked Questions | MyTSV.com",
  description:
    "Find answers to the most commonly asked questions about MyTSV.com, video campaigns, features, and support.",
  keywords: [
    "FAQ", "Frequently Asked Questions", "MyTSV", "Support", "Help", "Video Testimonials"
  ],
  url: `/faq`,
  image: "/images/question-img.svg",
});


export default function Fqa() {
  return (
    <FqaBox/>
  )
}
