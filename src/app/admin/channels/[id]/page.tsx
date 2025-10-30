"use client";
import ChannelBox from "@/components/common/admin/basic/chanel-details";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import ChannelDetails from "@/components/common/admin/view/channel";
import SubTilte from "@/components/reuseable/sub-title";
import { useGetChannelsDetailsQuery } from "@/redux/api/admin/channelApi";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Details() {
  const params = useParams();
  const id = params.id as string;
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetChannelsDetailsQuery({ id, arg: { page } });
  const { channel, videos, ...rest } = data || {};
  const [totalVideos, setTotalVideos] = useState<any>([]);

  const hasMore = totalVideos?.length < videos?.total;

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (videos?.data) {
      setTotalVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newVideos = videos.data.filter(
          (v: any) => !existingIds.has(v.id)
        );
        return [...prev, ...newVideos];
      });
    }
  }, [videos]);

  return (
    <div className="pb-10">
      <NavTitle
        title="Channel Details"
        subTitle="You can see & manage all the channels of MyTSV from here."
      />
      {/* body section */}
      <ChannelDetails channel={channel} rest={rest} />
      <SubTilte
        title="Videos"
        className="items-start pb-5 pt-10 text-2xl font-semibold"
      />
      <ChannelBox totalVideos={totalVideos} />
      {hasMore && !isLoading && (
        <div ref={ref} className="mx-auto flex justify-center mt-5">
          <Loader className="animate-spin text-blacks/20" />
        </div>
      )}
    </div>
  );
}
