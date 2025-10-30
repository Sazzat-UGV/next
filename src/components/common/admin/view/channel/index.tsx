"use client";
import assets from "@/assets";
import ProfileMapbox from "@/components/common/profile-map-box";
import { BackBtn } from "@/components/reuseable/icon-list";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import FavIcon from "@/icon/admin/favIcon";
import { useChannelDeleteMutation } from "@/redux/api/admin/channelApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Icon from "@/icon";

export default function ChannelDetails({ channel, rest }: any) {
  const [channelDelete] = useChannelDeleteMutation();
  const router = useRouter();
  const { confirm } = useConfirmation();

  // handleDelete
  const handleDeleteChannel = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this channel",
      description:
        "After deleting, users can't find this channel and videos anymore",
    });
    if (con) {
      const res = await channelDelete(id).unwrap();
      if (res.status) {
        router.back();
      }
    }
  };

  const {
    id,
    channel_name,
    cover_image,
    avatar,
    bio,
    contact,
    email,
    locations,
    services,
  } = channel || {};
  const { total_videos, total_views, total_likes } = rest || {};

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


  return (
    <div>
      <ul className="flex justify-between pb-5">
        <li>
          <BackBtn
            onClick={() => router.back()}
            iconStyle="bg-transparent"
            className="gap-x-0"
          />
        </li>
        <li>
          <Button
            variant="ghost"
            className="px-3 py-1 text-sm font-medium rounded-full border-1 border-reds text-blacks bg-[#FFE9E9] hover:bg-[#FFE9E9]"
            size={"lg"}
            onClick={() => handleDeleteChannel(id)}
          >
            <FavIcon name="delete" className="size-5" />
            Delete channel
          </Button>
        </li>
      </ul>
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_780px] gap-3">
        <Card className="p-2 border-0 gap-0">
          <div className="relative h-48 md:h-64">
            <Image
              src={cover_image || "/blur.png"}
              alt={`no cover image found for ${channel_name}`}

              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-15 translate-y-1/2 ">
              <Avatar className="size-24  shadow-md">
                <AvatarImage
                  src={avatar || "/blur.png"}
                  alt="Profile picture"
                />
                <AvatarFallback>{channel_name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-blacks">
                {channel_name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-18">
            {ViewItem?.map((item, index) => (
              <Card key={index} className="gap-0 p-2  border-1">
                <div className="flex justify-between px-4 py-3">
                  <div>
                    <div className="text-blacks">{item?.label}</div>
                    <div className="text-2xl font-bold">
                      {item?.value || 0}{" "}
                    </div>
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
        <div>
          <Card className="p-3 border-1 gap-0">
            <CardTitle className="text-xl font-semibold mb-2">About</CardTitle>
            <CardContent className="p-1 text-blacks text-sm leading-relaxed">
              {bio || "Not available bio"}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 mt-7">
            <Card className="p-3 border-1 gap-0 h-fit">
              <ul className="space-y-3">
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="locationGary" />
                  {locations?.find((item: any) => item.type === "head-office")
                    ?.location || "No location"}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="phoneGray" />
                  {contact || "No Contact"}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="mailGray" />
                  {email}
                </li>
              </ul>
            </Card>

            <Card className="p-3 border-1 gap-0">
              <CardTitle className="text-xl font-semibold mb-4">
                Services
              </CardTitle>
              <CardContent className="p-0 flex  max-w-xs gap-2 [&>button]:text-blacks">
                {services?.length ? (
                  services?.map((item: any, index: any) => (
                    <h1 key={index}>
                       {item},
                    </h1>
                  ))
                ) : (
                  <h1 className="text-grays">No services available</h1>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* map */}
      <Card className="p-1 mt-8">
        <ProfileMapbox className="md:h-[450px]" locations={locations} />
      </Card>
    </div>
  );
}
