"use client";
import assets from "@/assets";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import ProfileMapbox from "@/components/common/profile-map-box";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import Icon from "@/icon";
import { useChannelLandDetailsQuery } from "@/redux/api/landing/videosApi";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProfileBox() {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data: channelData, isLoading } = useChannelLandDetailsQuery({
    id,
    arg: { page },
  });
  const { channel, total_likes, total_videos, total_views, videoAll } =
    channelData || {};

  const ViewItem = [
    {
      label: "Views",
      value: total_views,
      icon: assets.dashboard.views,
    },
    {
      label: "Videos",
      value: total_videos,
      icon: assets.dashboard.videos,
    },
    {
      label: "Likes",
      value: total_likes,
      icon: assets.dashboard.likes,
    },
  ];
  const [totalVideos, setTotalVideos] = useState<any>([]);
  const hasMore = totalVideos?.length < videoAll?.meta.total;
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (videoAll?.data) {
      setTotalVideos((prev: any) => [...prev, ...videoAll?.data]);
    }
  }, [videoAll]);

  return (
    <div className="container pb-5 lg:pb-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="p-2 border-1 gap-0">
          <div className="relative h-48 md:h-64">
            <Image
              src={channel?.cover_image || "/blur.png"}
              alt="Cover image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-15 translate-y-1/2 ">
              <Avatar className="size-24  shadow-md">
                <AvatarImage
                  src={channel?.avatar}
                  alt={`${channel?.channel_name}`}
                />
                <AvatarFallback>
                  {channel?.channel_name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-blacks relative">
                {channel?.channel_name}
              </h2>
            </div>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <h2 className="opacity-0">left</h2>
            <Card className="w-fit">
              <ul className="space-y-1">
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="locationGary" />
                  {channel?.locations?.find(
                    (item: any) => item?.type === "head-office"
                  )?.location || "No Location"}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="phoneGray" />
                  {channel?.contact || "No Contact"}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="mailGray" />
                  {channel?.email || "No Email"}
                </li>
              </ul>
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ViewItem.map((item, index) => (
              <Card key={index} className="gap-0 p-2  border-1">
                <div className="flex justify-between px-4 py-3">
                  <div>
                    <div className="text-blacks">{item?.label}</div>
                    <div className="text-2xl font-bold">
                      {item?.value || 0}{" "}
                    </div>
                  </div>
                  <Image
                    src={item?.icon}
                    alt={item?.label}
                    width={44}
                    height={44}
                  />
                </div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <Card className="p-3 border-1 gap-0">
              <CardTitle className="text-xl font-semibold mb-2">
                About
              </CardTitle>
              <CardContent className="p-0 text-blacks text-sm leading-relaxed">
                {channel?.bio}
              </CardContent>
            </Card>
            <Card className="p-3 border-1 gap-0">
              <CardTitle className="text-xl font-semibold mb-4">
                Services
              </CardTitle>
              <CardContent className="p-0 flex flex-wrap gap-2">
                {channel?.services?.map((service: string, index: number) => (
                  <span key={`service-${index}`}>{service},</span>
                ))}
              </CardContent>
            </Card>
          </div>
        </Card>
        <Card className="p-1">
          <ProfileMapbox locations={channel?.locations} />
        </Card>
      </div>
      {/* Videos */}
      <div>
        <h1 className="font-medium text-xl py-5">Videos</h1>
        <div className="home gap-6">
          {isLoading ? (
            <SkeletonCount count={10}>
              <VideoCardSkeleton />
            </SkeletonCount>
          ) : totalVideos?.length > 0 ? (
            totalVideos?.map((video: any) => (
              <VideoCard key={video.id} item={video} />
            ))
          ) : (
            <div className="col-span-4">
              <NoItemData title="this channel No videos found" />
            </div>
          )}
        </div>
        {hasMore && !isLoading && (
          <div ref={ref} className="mx-auto opacity-0 flex justify-center mt-5">
            <Loader className="animate-spin text-blacks/20" />
          </div>
        )}
      </div>
    </div>
  );
}
