"use client";
import { VideoCardSkeleton } from "@/components/reuseable";
import { Back } from "@/components/reuseable/icon-list";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function PromotionAll() {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data: promoVideos, isLoading } = usePromoVideosSliderQuery({
    category_id: id,
    page,
  });
  const { data: categories } = useCategoriesQuery({ per_page: 1000 });
  const name = categories?.data?.find((item: any) => item.id == id)?.name;

  const [totalVideos, setTotalVideos] = useState<any>([]);
  const hasMore = totalVideos?.length < promoVideos?.meta.total;
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (promoVideos?.data) {
      setTotalVideos((prev: any) => [...prev, ...promoVideos?.data]);
    }
  }, [promoVideos]);

  return (
    <div>
      <div className="flex justify-between">
        <Back />
        <SubTilte title={name} />
        <h1 className="opacity-0">0</h1>
      </div>
      <div className="home gap-6">
        {isLoading ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : (
          totalVideos?.map((video: any) => (
            <VideoCard key={video.id} item={video} />
          ))
        )}
      </div>
      <div>
        {hasMore && !isLoading && (
          <div ref={ref} className="mx-auto opacity-0 flex justify-center mt-5">
            <Loader className="animate-spin text-blacks/20" />
          </div>
        )}
      </div>
    </div>
  );
}
