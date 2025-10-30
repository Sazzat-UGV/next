"use client";

import Slider from "react-slick";
import { useEffect, useRef } from "react";
import { useSidebar } from "@/context/useSideber";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCardSkeleton } from "@/components/reuseable";
import { VideoCard } from "@/components/reuseable/video-card";

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1536, // <= 1536px
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 1280, // <= 1280px
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 1024, // <= 1024px
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640, // <= 640px
      settings: { slidesToShow: 1 },
    },
  ],
};

export default function HomePromotion() {
  const { isExpanded } = useSidebar();
  const { data: promoVideos, isLoading: proLoading } =
    usePromoVideosSliderQuery({ per_page: 20 });

  const sliderRef = useRef<any>(null);

  // refresh slick on sidebar toggle
  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [isExpanded]);


  return (
    <div
      className={`overflow-hidden w-full transition-all duration-300 ${
        isExpanded ? "md:w-[calc(100vw-325px)]" : "md:w-[calc(100vw-150px)]"
      }`}
    >
      {proLoading ? (
        <div className="home gap-6">
          <SkeletonCount count={4}>
            <VideoCardSkeleton />
          </SkeletonCount>
        </div>
      ) : promoVideos?.data?.length > 4 ? (
        <Slider ref={sliderRef} {...settings}>
          {promoVideos?.data?.map((video: any) => (
            <div key={video.id} className="px-2">
              <VideoCard item={video} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="home gap-6">
          {promoVideos?.data?.map((video: any) => (
            <div key={video.id} className="px-2">
              <VideoCard item={video} />
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        .slick-prev,
        .slick-next {
          display: none !important;
        }
        .slick-slide {
          display: flex !important;
          height: auto !important;
        }
        .slick-slide > div {
          width: 100% !important; /* ✅ ensures slide takes full width */
        }
      `}</style>
    </div>
  );
}
