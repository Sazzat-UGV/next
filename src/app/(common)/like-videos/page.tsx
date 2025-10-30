"use client";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { ImgBox } from "@/components/common/admin/reuseable";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Button } from "@/components/ui/button";
import {
  useGetLinkeVideosQuery,
  useRemoveLikeMutation,
} from "@/redux/api/landing/videosApi";
import { useState } from "react";
import { Skeleton } from "@/components/ui";
import historyImg from "@/assets/historyImg.jpg";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib";
import Icon from "@/icon";
import QlEditor from "@/components/reuseable/ql-editor";

export default function LinkVideos() {
  const router = useRouter();
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const { data: likeVideos, isLoading } = useGetLinkeVideosQuery({ ...query });

  const topVideos = likeVideos?.data[0] || {};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-blacks">
        Liked Videos History
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Right Column: Search and Actions */}
        <ul className="space-y-6 like-gradient p-2 h-full rounded-t-2xl [&>li>h1]:text-white">
          <li>
            {" "}
            <ImgBox
              src={topVideos?.video?.thumbnail || historyImg || "/blur.png"}
              className="rounded-md h-[150px] border-7 w-full"
              alt="video"
            />
          </li>
          <li>
            <h1 className="text-2xl font-medium mb-1">Liked videos</h1>
            <h1>{likeVideos?.data?.length} videos</h1>
          </li>
          <li>
            <Link href={`/video/${topVideos?.video?.id}`}>
              <Button
                variant={"primary"}
                className="text-blacks bg-white px-10 rounded-full"
              >
                <Icon name="playBlack" />
                Play all
              </Button>
            </Link>
          </li>
        </ul>
        {/* Left Column: Watch History List */}
        <div className="space-y-4">
          {isLoading ? (
            <SkeletonCount count={10}>
              <div className="flex flex-col md:flex-row  gap-4 p-4 border-b">
                <Skeleton className="rounded-sm h-img-xs md:h-[125px] w-full md:w-[200px]" />
                <div className="flex-1 grid gap-1 space-y-1">
                  <Skeleton className="h-4 w-full md:w-1/2" />
                  <Skeleton className="h-3 w-[80%] md:w-[30%]" />
                  <Skeleton className="h-2 w-[80%] md:w-[70%]" />
                  <Skeleton className="h-2 w-[80%] md:w-[70%]" />
                  <Skeleton className="h-2 hidden md:block md:w-[70%]" />
                  <Skeleton className="h-2 hidden md:block md:w-[70%]" />
                  <Skeleton className="h-2 hidden md:block md:w-[70%]" />
                </div>
                <Skeleton className="size-7 hidden md:block rounded-full" />
              </div>
            </SkeletonCount>
          ) : likeVideos?.data?.length > 0 ? (
            likeVideos?.data?.map((item: any) => (
              <div
                key={item?.id}
                className="flex flex-col md:flex-row gap-4 cursor-pointer p-4 border-b"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/video/${item?.video?.id}`);
                }}
              >
                <div>
                  <ImgBox
                    className="rounded-sm h-img-xs md:h-[125px] w-full md:w-[200px]"
                    src={item?.video?.thumbnail}
                    alt={item?.video?.title}
                  >
                    <RemoveVideoButton
                      videoId={item?.id}
                      iconStyle="text-white text-sm"
                      className="absolute top-2 bg-reds/70  grid rounded-full size-9 hover:bg-reds/70 right-2 md:hidden"
                    />
                  </ImgBox>
                </div>
                <div className="flex-1 grid gap-1">
                  <h2 className="font-semibold text-lg">
                    {item?.video?.title}
                  </h2>
                  <p className="text-blacks font-medium">
                    {item?.video?.user?.channel_name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="mr-2">
                      {item?.video?.views_count} views
                    </span>
                    <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full"></span>
                    <span>{item?.video?.upload_time}</span>
                  </div>
                  <div 
                  className="*:!font-normal !h-[50px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item?.video?.description,
                    }}
                  ></div>
                </div>
                <RemoveVideoButton
                  videoId={item?.id}
                  className="hidden md:block"
                />
              </div>
            ))
          ) : (
            <NoItemData title="You haven't liked any videos yet" />
          )}

          <ul className="flex flex-wrap justify-end my-7">
            <li className="font-medium">
              <Pagination
                onPageChange={(v: any) => setIsPage(v)}
                {...likeVideos?.meta}
              ></Pagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// RemoveVideoButton Component
interface RemovebtnProps {
  videoId: string;
  className?: string;
  iconStyle?: string;
}

function RemoveVideoButton({ videoId, className, iconStyle }: RemovebtnProps) {
  const [removeLike, { isLoading: removeLoading }] = useRemoveLikeMutation();

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removeLike(videoId).unwrap();
  };

  return (
    <Button
      disabled={removeLoading}
      variant="ghost"
      size="icon"
      className={cn(`ml-auto disabled:opacity-100`, className)}
      onClick={handleRemove}
    >
      <X className={cn("size-5 text-blacks", iconStyle)} />
      <span className="sr-only">Remove video</span>
    </Button>
  );
}
