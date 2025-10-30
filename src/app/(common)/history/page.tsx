"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/icon";
import {
  useBulkDeleteHistoryMutation,
  useRemoveHistoryMutation,
  useToggleHistoryMutation,
  useWatchHistoryQuery,
} from "@/redux/api/landing/historyApi";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Skeleton } from "@/components/ui";
import { ImgBox } from "@/components/common/admin/reuseable";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, string | number> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const {
    data: history,
    isLoading,
    refetch,
  } = useWatchHistoryQuery({ ...query });
  const [removeHistory, { isLoading: isRemoveLoading }] =
    useRemoveHistoryMutation();
  const [toggleHistory, { isLoading: isToogleLoading }] =
    useToggleHistoryMutation();
  const [bulkDeleteHistory] = useBulkDeleteHistoryMutation();
  const { data: profile } = useGetProfileQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Handle Remove History Logic
  const HandleRemoveHistory = async (e: any, id: string) => {
    e.stopPropagation(); // Prevent event propagation
    const res = await removeHistory(id).unwrap();
    if (res.status) {
      refetch();
    }
  };

  // Handle Bulk Delete Logic
  const handleAllDelete = async () => {
    const res = await bulkDeleteHistory({}).unwrap();
    if (res?.status) {
      refetch(); // Refetch data after bulk deletion
    }
  };

  // Handle History Toggle (Pause/Play)
  async function HistoryToggle() {
    await toggleHistory({}).unwrap();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-blacks">Watch History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* Left Column: Watch History List */}
        <div className="space-y-4 order-2 lg:order-1">
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
          ) : history?.data.length > 0 ? (
            history?.data?.map((item: any) => (
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
                    {/* Remove Button  block md:hidden */}
                    <Button
                      disabled={isRemoveLoading}
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 bg-reds/70 grid rounded-full size-9 hover:bg-reds/70 right-2 md:hidden"
                      onClick={(e) => HandleRemoveHistory(e, item?.id)}
                    >
                      <X className="text-white size-5" />
                      <span className="sr-only">Remove video</span>
                    </Button>
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
                  {/* <p className="text-sm text-grays line-clamp-2">
                    {item?.video?.description}
                  </p> */}
                  <div
                    className="*:!font-normal !h-[50px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item?.video?.description,
                    }}
                  ></div>
                </div>

                {/* Remove Button  hidden md:block */}
                <Button
                  disabled={isRemoveLoading}
                  variant="ghost"
                  size="icon"
                  className="ml-auto hidden md:block disabled:opacity-100"
                  onClick={(e) => HandleRemoveHistory(e, item?.id)}
                >
                  <X className="size-5 text-blacks" />
                  <span className="sr-only">Remove video</span>
                </Button>
              </div>
            ))
          ) : (
            <NoItemData title="No videos found in your watch history" />
          )}

          <ul className="flex flex-wrap justify-end my-7">
            <li className="font-medium">
              <Pagination
                onPageChange={(v: any) => setIsPage(v)}
                {...history?.meta}
              />
            </li>
          </ul>
        </div>

        {/* Right Column: Search and Actions */}
        <ul className="space-y-6 flex flex-row lg:flex-col justify-between lg:justify-start order-1 lg:order-2">
          <li>
            <div className="relative bg-white rounded-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search history"
                onChange={(e) => setIsSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-none"
              />
            </div>
          </li>
          <li>
            <ul className="space-y-6 flex flex-row gap-3 lg:gap-0 lg:flex-col justify-between lg:justify-start">
              <li>
                <Button
                  onClick={handleAllDelete}
                  variant="primary"
                  className="md:w-fit md:rounded-full"
                >
                  <Icon name="deleteWhite" />
                  <span className="hidden md:block">
                    {" "}
                    Clear all watch history
                  </span>
                </Button>
              </li>
              <li>
                <Button
                  disabled={isToogleLoading}
                  variant="outline"
                  className="w-fit md:rounded-full disabled:opacity-100"
                  onClick={HistoryToggle}
                >
                  {profile?.data?.pause_watch_history ? (
                    <span className="flex items-center">
                      <Icon name="playBlack" className="md:mr-2" />
                      <span className="hidden md:block">
                        Play Watch history
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Icon width={13} name="pauseBlack" className="md:mr-2" />
                      <span className="hidden md:block">
                        Pause Watch history
                      </span>
                    </span>
                  )}
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
