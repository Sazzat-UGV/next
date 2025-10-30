import React from "react";
import VideoPlayer from "@/components/common/video-player";
import Avatars from "@/components/reuseable/avater";
import Link from "next/link";
import FavIcon from "@/icon/admin/favIcon";
import SelectBox from "@/components/reuseable/select-box";

export default function ReportView({ onChange, options, item }: any) {
  const {
    video,
    reason,
    issue
  } = item || {};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 pb-8">
      <div>
        <VideoPlayer
          type={video?.type}
          video={video?.video}
          link={video?.link}
          thumbnail={video?.thumbnail}
          className="md:h-[300px]"
        />
        <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
          <div className="flex items-center gap-3">
            <Avatars
              src={video?.user?.avatar}
              fallback={video?.user?.channel_name}
              alt="Channel Avatar"
            />
            <div className="flex-1">
              <Link href="#" className="font-semibold text-gray-900">
                {video?.user?.channel_name}
              </Link>
            </div>
          </div>
          {/* right */}
          <div className="flex mt-2 md:mt-0 flex-wrap items-center gap-x-4 gap-y-2  text-sm has-[>div]:cursor-pointer">
            <div className="flex   border px-3 space-x-1 h-8 items-center rounded-full">
              <FavIcon name="eye" color="#888888" className="size-6" />
              <span className="text-blacks font-semibold">
                {video?.likes_count_formatted}
              </span>
            </div>
            <div className="flex  border px-3 h-8 space-x-1 items-center rounded-full">
              <FavIcon
                name="likeUp"
                color="#888888"
                className="size-5 relative mb-[1px]"
              />
              <span className="text-blacks font-semibold">
                {video?.views_count_formatted}
              </span>
            </div>
            <div className="flex border px-3 h-8 items-center space-x-1 rounded-full">
              <FavIcon
                name="likeDown"
                color="#888888"
                className="size-5 relative mr-1 top-[2px]"
              />
              <span className="text-blacks font-semibold">
                {video?.dislikes_count_formatted}
              </span>
            </div>
            <div className="flex  border px-3 h-8 items-center space-x-1 rounded-full">
              <FavIcon
                name="comnet"
                color="#888888"
                className="size-5 relative top-[2px]"
              />
              <span className="text-blacks font-semibold">
                {video?.comments_count_formatted}
              </span>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <SelectBox
            items={options}
            onChange={(value: any) => onChange(value)}
            placeholder="Take action"
          />
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-lg lg:text-xl font-semibold text-blacks">
          {video?.title}
        </h1>
        <div className="border p-3 rounded-md  shadow-xs">
          <p className="text-sm text-blacks font-semibold">10 hours ago</p>
          <p className="mt-1  text-sm text-grays leading-relaxed">
            {video?.description}
          </p>
        </div>
        <ul className="flex justify-between h-12 border rounded-full items-center px-2">
          <li>Reason</li>
          <li className="text-reds flex  items-center">
            {reason}
            <FavIcon className="ml-2" name="question" />
          </li>
        </ul>
        <div className="border rounded-md p-3">
          <h1 className="text-reds text-lg font-medium">Issue</h1>
          <p className="mt-1  text-sm text-grays leading-relaxed">{issue}</p>
        </div>
      </div>
    </div>
  );
}
