"use client"
import { Card } from '@/components/ui'
import Icon from '@/icon'
import { useGetContactQuery } from '@/redux/api/landing/contactApi';
import React from 'react'

export default function ContactPreview() {
    const { data: contact,isLoading} = useGetContactQuery({});
    const data = contact?.data;
  return (
     <Card className="py-6 px-10">
          <div className="flex flex-col justify-between rounded-xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <p className="text-blacks max-w-md">
                We&apos;d love to hear from you! Reach out to us through any of
                the following methods:
              </p>
              <div className="space-y-3 mt-8">
                <div className="flex items-center space-x-3 [&>div]:text-blacks">
                  <Icon name="femail" width={19} height={19} />
                  <span>{data?.email || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="fphone" width={19} height={19} />
                  <span>{data?.phone || "N/A"}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="locationBlack" width={19} height={19} />
                  <span>{data?.address || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
  )
}
