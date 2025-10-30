import React, { useState } from "react";
import { TabBoxProps } from "@/types";
import TabBox from "./tab-box";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MonthlyBox from "@/components/reuseable/date-box";
import { useVideoAnalyticsQuery } from "@/redux/api/dashboard/videosApi";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui";
import { ChartAreaOverView2 } from "../../chats/analytics-chart";

export default function Analytics({ isTab, setIsTab }: TabBoxProps) {
  const { slug: id } = useParams();
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

  const { data, isLoading } = useVideoAnalyticsQuery({ id, arg: query });
  const { analytics, total_views, total_likes, total_dislikes } = data || {};

  return (
    <div>
      <ul className="flex justify-between my-4">
        <li>
          <Link
            className="font-medium text-lg flex items-center"
            href={"/dashboard/my-videos"}
          >
            <ArrowLeft size={18} className="mr-3 font-bold" />
            Video analytics
          </Link>
        </li>
      </ul>
      <TabBox isTab={isTab} setIsTab={setIsTab} className="my-10" />
      <div>
        <div>
          <ul className="flex items-center justify-between mt-8">
            <li className="opacity-0">0</li>
            <li className="text-xl md:text-2xl font-semibold">
              {`Your video got ${total_views || 0}  views in this month`}
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
              className="border-none"
              type={isMonth}
              analytics={!isLoading && analytics}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
