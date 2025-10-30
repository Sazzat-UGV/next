"use client";
import NavItem from "@/components/common/dashboard/navber";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import Icon from "@/icon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {useState } from "react";
import MonthlyBox from "@/components/reuseable/date-box";
import { useUserDashboardQuery } from "@/redux/api/dashboard/simpleApi";
import { ChartAreaOverView } from "@/components/common/chats/area";
import { Skeleton } from "@/components/ui/skeleton";
import assets from "@/assets";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";


export default function Dashboard() {
  const [isMonth, setIsMonth] = useState({
    type: "",
    month: "",
    year: null,
  });

  // Build query dynamically
  const query: Record<string, any> = {
    type: isMonth.type || "monthly",
    ...(isMonth.type === "custom" && {
      month: isMonth.month,
      year: isMonth.year,
    }),
  };

  const { data, isLoading } = useUserDashboardQuery(query);
  const { analytics, user, views, videos, likes } = data?.data || {};
  const ViewItem = [
    {
      label: "Views",
      value: views,
      icon: assets.dashboard.views,
    },
    {
      label: "Videos",
      value: videos,
      icon: assets.dashboard.videos,
    },
    {
      label: "Likes",
      value: likes,
      icon: assets.dashboard.likes,
    },
  ];


  

  return (
    <div>
      <NavItem search={false} title="Dashboard Overview" />
      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="w-full h-[580px] border p-2 rounded-md">
              <div className="relative">
                <Skeleton className="w-full h-[200px] bg-blacks/10" />
                <div className="space-y-2 mx-auto relative -top-20 w-[200px]">
                  <Skeleton className="size-30 mx-auto rounded-full" />
                  <Skeleton className="w-[200px] mx-auto h-4 rounded-full" />
                  <Skeleton className="w-[200px] mx-auto h-4 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between">
                    <Skeleton className="w-[120px] h-8 rounded-full" />
                    <Skeleton className="w-[120px] h-8 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
                    <Skeleton className="w-full h-[100px] rounded-md" />
                    <Skeleton className="w-full h-[100px] rounded-md" />
                    <Skeleton className="w-full h-[100px] rounded-md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full  flex flex-col gap-4">
              <div className="border w-full h-1/2 rounded-md p-2 space-y-2">
                <Skeleton className="w-full h-8 bg-blacks/10 rounded-full" />
                <Skeleton className="w-full h-4 bg-blacks/10 rounded-full" />
                <Skeleton className="w-full h-4 bg-blacks/10 rounded-full" />
                <Skeleton className="w-full h-4 bg-blacks/10 rounded-full" />
              </div>
              <div className="border w-full h-1/2 rounded-md p-2 space-y-2">
                <Skeleton className="w-full h-8 bg-blacks/10 rounded-md" />
                <div className="flex flex-wrap gap-4">
                  <SkeletonCount count={10}>
                    <Skeleton className="w-[100px] h-7  bg-blacks/10 rounded-full" />
                  </SkeletonCount>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Card className="p-2 border-1 gap-0">
              <div className="relative h-48 md:h-64">
                <Image
                  src={user?.cover_image}
                  alt={user?.channel_name}
                  layout="fill"
                  objectFit="cover"
                  onLoad={(event) => {
                    event.currentTarget.setAttribute("data-loaded", "true");
                  }}
                  className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 rounded-xl"
                />
                <Avatar className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 size-24  shadow-md">
                  <AvatarImage src={user?.avatar} alt={user?.channel_name} />
                  <AvatarFallback>
                    {user?.channel_name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="pt-14 pb-4 px-6 text-center mx-auto">
                <h2 className="text-2xl font-semibold text-blacks">
                  {user?.channel_name}
                </h2>
                <p className="text-base flex items-center justify-center text-center gap-1 mt-1">
                  <Icon name="locationGary" />
                  {user?.locations?.find(
                    (loc: any) => loc?.type === "head-office"
                  )?.location ?? "No Location"}
                </p>
              </CardContent>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-[22px] text-blacks font-semibold">
                  Analytics
                </CardTitle>
                <Link
                  href="/dashboard/analytics"
                  className="items-center hidden md:flex  gap-1 font-normal text-blacks border-1 py-2 px-5 rounded-full"
                >
                  See full analytics <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-4">
                {/* last:col-span-2 last:mx-30 2x:col-span-1 */}
                {ViewItem.map((item, index) => (
                  <Card key={index} className="gap-0 p-2   border-1">
                    <div className="flex justify-between px-4 py-3">
                      <div>
                        <div className="text-blacks">{item.label}</div>
                        <div className="text-2xl font-bold">{item.value} </div>
                      </div>
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={44}
                        height={44}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
            <div className="h-full  flex flex-col gap-4">
              {/* About Section */}
              <Card className="p-3 border-1 gap-0 h-1/2 overflow-hidden">
                <CardTitle className="text-xl font-semibold mb-2">
                  About
                </CardTitle>
                <CardContent className="p-0 text-blacks text-sm leading-relaxed lg:pr-20">
                  {user?.bio}
                </CardContent>
              </Card>

              {/* Services Section */}
              <Card className="p-3 border-1 gap-0 h-1/2">
                <CardTitle className="text-xl font-semibold mb-2">
                  Services
                </CardTitle>
                <CardContent className="p-0 flex flex-wrap max-w-xs gap-3 [&>button]:text-blacks">
                  {user?.services?.map((item: any, index: any) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="rounded-full  px-4 py-2 text-sm bg-transparent"
                    >
                      {index + 1} {item}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <ChartAreaOverView type={isMonth} analytics={analytics}>
        <MonthlyBox setIsMonth={setIsMonth} />
      </ChartAreaOverView>
    </div>
  );
}
