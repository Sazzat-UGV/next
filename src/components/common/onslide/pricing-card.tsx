"use client"
import Icon from "@/icon";
import { useGetPriceQuery } from "@/redux/api/admin/pricingApi";
import React from "react";

export default function OnsidePricingCard() {
  const { data } = useGetPriceQuery({});
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="relative onside-free p-8 rounded-4xl shadow-lg text-white flex flex-col items-start">
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-body p-2 rounded-full">
          <Icon name="phoned" />
        </div>
        <div className="mx-auto">
          <h3 className="text-[22px] font-semibold mb-5 w-full text-center">
            One-Time Sign-Up Fee: {`${data?.onsite_account_creation || 0}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-lg">
            <ul className="list-none space-y-3">
              <li>🎥 Video recording on-site</li>
              <li>🔍 Local SEO Optimization</li>
            </ul>
            <ul className="list-none space-y-3">
              <li>📲 Upload + Profile Setup</li>
              <li>📢 Promotion across MyTSV.com channels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
