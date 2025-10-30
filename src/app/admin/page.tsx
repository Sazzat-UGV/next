"use client";
import ChannelChart from "@/components/common/admin/chart/channel";
import { PieCharts } from "@/components/common/admin/chart/pie";
import PreferenceChart from "@/components/common/admin/chart/preference";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { useGetOverviewQuery } from "@/redux/api/admin/overviewApi";
import { Card } from "@/components/ui/card";
import FavIcon from "@/icon/admin/favIcon";
import Link from "next/link";

export default function Home() {
  const { data } = useGetOverviewQuery({});
  const {
    total_channels,
    total_videos,
    total_earnings,
    earning_statistics,
    channel_creating_statistics,
    video_posting_preferences,
  } = data || {};

  const stats = [
    {
      title: "Total channels",
      value: total_channels,
      icon: <FavIcon name="chanel" />,
      href: "/admin/channels",
    },
    {
      title: "Total videos",
      value: total_videos,
      icon: <FavIcon name="videos" />,
      href: "/admin/videos",
    },
    {
      title: "Earnings",
      value: total_earnings,
      icon: <FavIcon name="earnings" />,
      href: "/admin/transactions",
    },
  ];

  return (
    <div>
      <NavTitle
        title="Dashboard Overview"
        subTitle="You can see all of your apps statistics from here"
      />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {stats?.map((item, idx) => (
          <Link key={idx} href={item.href || ""}>
            <Card
              className="flex flex-row shadow-none bg-white gap-0 border-1  py-7 px-4 justify-between"
            >
              <div>
                <h1 className="text-xl font-medium  text-blacks">
                  {item.title}
                </h1>
                <h1 className="text-3xl font-semibold mt-1">
                  {item.value || 0}
                </h1>
              </div>
              <div className="bg-red-100 size-14 grid place-items-center rounded-full">
                {item.icon}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 my-8">
        <div>
          <h1 className="text-xl font-semibold mb-4">
            Channel creating Statistics
          </h1>
          <ChannelChart item={channel_creating_statistics} />
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-4">Earning Statistics</h1>
          <PieCharts item={earning_statistics} />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold mb-4">
          Video posting preferences
        </h1>
        <PreferenceChart item={video_posting_preferences} />
      </div>
    </div>
  );
}
