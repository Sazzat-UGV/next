"use client";
import { ChartAreaOverView2 } from "@/components/common/chats/analytics-chart";
import NavItem from "@/components/common/dashboard/navber";
import MonthlyBox from "@/components/reuseable/date-box";
import { Card } from "@/components/ui";
import { useGetAnalyticsQuery } from "@/redux/api/dashboard/simpleApi";
import React, { useState } from "react";

export default function Analytics() {
  const [isMonth, setIsMonth] = useState({
    type: "",
    month: "",
    year: null,
  });
  const query: Record<string, any> = {
    type: isMonth.type || "monthly",
    ...(isMonth.type === "custom" && {
      month: isMonth.month,
      year: isMonth.year,
    }),
  };

  const { data, isLoading } = useGetAnalyticsQuery(query);
  const { analytics, total_views, total_likes, total_dislikes } =
    data?.data || {};
  return (
    <div>
      <NavItem title="Analytics" search={false} />
      <div>
        <div>
          <ul className="flex items-center justify-between mt-8">
            <li className="opacity-0">0</li>
            <li className="text-xl md:text-2xl font-semibold">
              {`Your channel got ${total_views || 0} views in this month`}
            </li>
            <li>
              {" "}
              <MonthlyBox setIsMonth={setIsMonth} />
            </li>
          </ul>
        </div>
        <div>
          <Card className="p-0 rounded-xl mb-5 border-1 mt-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 mb-15">
              {[
                {
                  label: "Views",
                  value: total_views,
                  bgColor: "bg-white",
                },
                {
                  label: "Likes",
                  value: total_likes,
                  bgColor: "bg-body",
                },
                {
                  label: "Dislikes",
                  value: total_dislikes,
                  bgColor: "bg-body",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`py-5 border-b-1 border-r-1 first:rounded-tl-xl last:rounded-tr-xl last:border-r-0 ${item.bgColor}`}
                >
                  <h1 className="text-lg font-normal text-blacks text-center">
                    {item.label}
                  </h1>
                  <h1 className="text-3xl font-bold text-center mt-3">
                    {item.value || 0}
                  </h1>
                </div>
              ))}
            </div>
            <ChartAreaOverView2
              isActive={false}
              type={isMonth}
              className="border-none"
              analytics={analytics}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
