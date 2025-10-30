"use client";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import HomeCarousel from "@/components/common/home-carousel";
import HomePromotion from "@/components/common/home-promotion";
import SeeNav from "@/components/common/see-nav";
import FilterBox from "@/components/reuseable/filter-box";
import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import { roleKey } from "@/lib";
import { capitalize, getCookie } from "@/lib/utils";
import { useGetBannerQuery } from "@/redux/api/admin/promotionalApi";
import {
  useHomeVideosQuery,
  useRelatedVideosQuery,
} from "@/redux/api/landing/videosApi";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import slugify from "slugify";

export default function Home() {
  const { ref, inView } = useInView();
  const { ref: ref1, inView: inView1 } = useInView();
  const [page, setPage] = useState(1);
  const [homePage, setHomePage] = useState(1);
  const [similarVideos, setSimilarVideos] = useState<any[]>([]);
  const [isCategory, setIsCategory] = useState({ id: "all", name: "All" });
  const roleValue = getCookie(roleKey);
  const { data: banners } = useGetBannerQuery({});

  const isAdmin = roleValue === "ADMIN";

  useEffect(() => {
    if (isAdmin) {
      redirect("/admin");
    }
  }, [isAdmin]);

  useEffect(() => {
    setPage(1);
    setSimilarVideos([]);
  }, [isCategory]);

  // === chnanel video by category =======
  const { data: chVideos, isLoading: videoLoading } = useHomeVideosQuery({
    page: homePage,
  });

  const [totalVideos, setTotalVideos] = useState<any>([]);
  const isNoVideo = chVideos?.data?.length === 0;
  useEffect(() => {
    if (inView1 && !videoLoading) {
      setHomePage((prevPage) => prevPage + 1);
    }
  }, [inView1, videoLoading]);

  useEffect(() => {
    if (chVideos?.data) {
     setTotalVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = chVideos?.data?.filter(
          (v: any) => !existingIds.has(v.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [chVideos]);

  // ========= category by related video ========
  const query = { page };
  const {
    data: relatedVideos,
    isFetching,
    isLoading: relatedLoading,
  } = useRelatedVideosQuery(
    { id: isCategory.id, arg: query },
    { skip: isCategory.id === "all" }
  );

  useEffect(() => {
    if (relatedVideos?.data) {
      setSimilarVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = relatedVideos?.data?.filter(
          (v: any) => !existingIds.has(v.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [relatedVideos?.data]);

  const isNoVideos = relatedVideos?.data?.length === 0;

  useEffect(() => {
    if (inView && !isFetching && isCategory.id !== "all" && !relatedLoading) {
      setPage((p) => p + 1);
    }
  }, [inView, isCategory.id, relatedLoading, isFetching]);

  return (
    <div>
      <FilterBox isCategory={isCategory} setIsCategory={setIsCategory} />
      <div>
        {isCategory.id !== "all" && (
          <h1 className="text-xl font-medium pt-5 pb-3">
            {capitalize(isCategory.name)}
          </h1>
        )}

        {/* <h1 className="text-xl font-medium pt-8 pb-3">
          {isCategory.id === "all"
            ? "Promotional videos"
            : capitalize(isCategory.name)}
        </h1> */}

        {isCategory.id === "all" ? (
          <>
            <div>
              <HomeCarousel />
              <h1
                className={`${
                  !banners?.is_banner_active && "pt-5"
                } text-xl font-medium pb-3`}
              >
                Promotional videos
              </h1>
              <HomePromotion />
            </div>
            <div>
              {videoLoading ? (
                <div className="home gap-6 mt-5">{Skeleton(8)}</div>
              ) : (
                totalVideos?.map((channel: any) =>
                  channel?.videos?.length ? (
                    <div key={channel.id}>
                      <SeeNav
                        title={channel.name}
                        href={`/videos/${channel.id}_${slugify(channel.name, {
                          strict: true,
                        })}`}
                      />
                      <div className="home gap-6">
                        {channel.videos.map((video: any) => (
                          <VideoCard key={video.id} item={video} />
                        ))}
                      </div>
                    </div>
                  ) : null
                )
              )}
              {!isNoVideo && !videoLoading && (
                <div
                  ref={ref1}
                  className="mx-auto opacity-0 flex justify-center mt-5"
                >
                  <Loader className="animate-spin text-blacks/20" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <div className="home gap-6">
              {relatedLoading ? (
                Skeleton(6)
              ) : similarVideos?.length > 0 ? (
                similarVideos?.map((video: any, idx: number) => (
                  <VideoCard key={idx} item={video} />
                ))
              ) : (
                <NoItemData
                  title="No videos are currently available in this category"
                  className="col-span-4"
                />
              )}
            </div>
            {/* ✅ Loader only when more pages left */}
            <div>
              {!relatedLoading && !isNoVideos && (
                <div ref={ref} className="mx-auto flex justify-center mt-5">
                  <Loader className="animate-spin text-blacks/20" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton loading
function Skeleton(count: number) {
  return (
    <SkeletonCount count={count}>
      <VideoCardSkeleton />
    </SkeletonCount>
  );
}
