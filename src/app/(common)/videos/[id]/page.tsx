"use client";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { Back } from "@/components/reuseable/icon-list";
import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { useRelatedVideosQuery } from "@/redux/api/landing/videosApi";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function VideoList() {
  const { id } = useParams();
  const [num, name] = (id as string)?.split("_");
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const query: Record<string, any> = { page };
  const {
    data: relVideos,
    isLoading,
    isFetching,
  } = useRelatedVideosQuery(
    { id:num, arg: query },
    {
      skip:!num,
    }
  );

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
    <div>
      <div className="flex justify-between">
        <Back />
        <SubTilte title={name?.replace(/-/g, ' ')} />
        <h1 className="opacity-0">0</h1>
      </div>
      <div>
        <div className="home gap-6">
          {isLoading ? (
            <SkeletonCount count={8}>
              <VideoCardSkeleton />
            </SkeletonCount>
          ) : videos?.length > 0 ? (
            videos?.map((video: any) => (
              <VideoCard key={video.id} item={video} />
            ))
          ) : (
            <NoItemData
              title="No videos are currently available"
              className="col-span-4"
            />
          )}
        </div>
        {!isLoading && !isNoVideos && (
          <div ref={ref} className="mx-auto flex justify-center mt-5">
            <Loader className="animate-spin text-blacks/20" />
          </div>
        )}
      </div>
    </div>
  );
}
