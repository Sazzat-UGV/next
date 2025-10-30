import { RelatedVideoCard, VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { useRelatedVideosQuery } from "@/redux/api/landing/videosApi";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import { cn } from "@/lib";
import { VideoCard } from "@/components/reuseable/video-card";

export default function RelatedVideosRight({ id }: any) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1); // Tracks the page number
  const query: Record<string, any> = { page }; // Query object to pass in the API call

  const {
    data: relVideos,
    isLoading,
    isFetching,
  } = useRelatedVideosQuery({
    id,
    arg: query,
  });

  // Pagination box functionality
  const [videos, setIsVideos] = useState<any>([]);

  useEffect(() => {
    if (inView && !isFetching && relVideos?.data?.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, relVideos]);

  // Effect to update the videos list when new data is fetched
  useEffect(() => {
    if (relVideos?.data) {
      setIsVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = relVideos.data.filter(
          (v: any) => !existingIds.has(v.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [relVideos?.data]);

  // Hide pagination loader if no videos are available
  const isNoVideos = relVideos?.data?.length === 0;

  return (
    <>
      <h2 className="text-xl font-semibold hidden md:block mb-4">
        Related videos
      </h2>
      <div className="space-y-10 md:space-y-5">
        {isLoading ? (
          <SkeletonCount count={10}>
            <VideoCardSkeleton className="md:hidden" />
            <RelatedVideoCard className="hidden md:flex" />
          </SkeletonCount>
        ) : (
          videos?.map((item: any) => (
            <Fragment key={item.id}>
              <VideoCard className="md:hidden" item={item} />
              <LaptopAndDesktopView className="hidden md:flex" item={item} />
            </Fragment>
          ))
        )}

        {!isLoading && !isNoVideos && (
          <div ref={ref} className="mx-auto flex justify-center mt-5">
            <Loader className="animate-spin text-blacks/20" />
          </div>
        )}
      </div>
    </>
  );
}

// Laptop and desktop view card component
const LaptopAndDesktopView = ({ item, className }: any) => {
  return (
    <Link
      href={`/video/${item.id}`}
      className={cn("flex gap-3 group", className)}
    >
      <div className="relative w-37 h-22 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={item.thumbnail}
          alt="Related video thumbnail"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium line-clamp-2 text-blacks">
          {item.title}
        </h3>
        <ul>
          <li className="text-gray-600 text-base mt-1">
            {item?.user?.channel_name}
          </li>
          <li className="text-grays flex space-x-2 items-center text-sm">
            <span className="text-xs">{item.views_count_formated} views</span>
            <span className="flex items-center text-sm">
              <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
              {item.created_at_format}
            </span>
          </li>
        </ul>
      </div>
    </Link>
  );
};
