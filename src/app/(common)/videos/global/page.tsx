"use client";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { useGolbalSearchQuery } from "@/redux/api/commonApi";
import { useSearchParams } from "next/navigation";
import { Back } from "@/components/reuseable/icon-list";
import React, { Suspense, useEffect, useState } from "react";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";

// service:3
function GlobalSearchChild() {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const query = {
    page: page,
    ...paramsObject,
  };
  const { data: videos, isLoading } = useGolbalSearchQuery({ ...query });
  const [totalVideos, setTotalVideos] = useState<any>([]);
  const hasMore = totalVideos?.length < videos?.meta.total;
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (videos?.data) {
      setTotalVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = videos?.data.filter((v: any) => !existingIds.has(v.id));
        return [...prev, ...newOnes];
      });
    }
  }, [videos]);

  return (
    <div>
      <div className="flex justify-between">
        <Back />
        <SubTilte title="All Videos" />
        <h1 className="opacity-0">0</h1>
      </div>
      <div className="home gap-6">
        {isLoading ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : totalVideos?.length > 0 ? (
          totalVideos?.map((video: any) => (
            <VideoCard key={video.id} item={video} />
          ))
        ) : (
          <NoItemData
            className="col-span-4"
            title="No videos available at this moment"
          />
        )}
      </div>
      {hasMore && !isLoading && (
        <div ref={ref} className="mx-auto  flex justify-center mt-5">
          <Loader className="animate-spin text-blacks/20" />
        </div>
      )}
    </div>
  );
}

// GlobalSearch
export default function GlobalSearch() {
  return (
    <Suspense>
      <GlobalSearchChild />
    </Suspense>
  );
}
