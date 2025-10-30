"use client";
import NavItem from "@/components/common/dashboard/navber";
import {
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import React, { useState } from "react";
import { Pagination } from "@/components/reuseable/pagination";
import { DeleteBtn } from "@/components/reuseable/btn";
import Modal from "@/components/reuseable/modal";
import TabList from "@/components/common/upload/tab";
import {
  useBulkDeleteMutation,
  useSingleDeleteMutation,
  useUserVideosQuery,
} from "@/redux/api/dashboard/videosApi";
import { ImgBox } from "@/components/common/admin/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { useDebounce } from "use-debounce";
import FavIcon from "@/icon/admin/favIcon";
import { modifyPayloadBulk } from "@/lib";
import Icon from "@/icon";
import Link from "next/link";

export default function MyVideos() {
  const { confirm } = useConfirmation();
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const [isUpload, setIsUpload] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isPage, setIsPage] = useState<number>();
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: userVideos, isLoading } = useUserVideosQuery({ ...query });
  const [selectedVideoIds, setSelectedVideoIds] = useState<string[]>([]);
  const [bulkDelete] = useBulkDeleteMutation();
  const [singleDelete] = useSingleDeleteMutation();

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedVideoIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedVideoIds((prevIds) =>
        prevIds.filter((videoId) => videoId !== id)
      );
    }
  };

  // /handleDeleteAll
  const handleDeleteAll = async () => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
      titleStyle: "px-10",
    });
    if (con) {
      const data = modifyPayloadBulk("ids[]", selectedVideoIds);
      const res = await bulkDelete(data).unwrap();
      if (res?.status) {
        setSelectedVideoIds([]);
      }
    }
    setSelectedVideoIds([]);
  };

  // /SingleVideoDelete
  const SingleVideoDelete = async (id: string) => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
      titleStyle: "px-10",
    });
    if (con) {
      await singleDelete(id).unwrap();
    }
  };

  return (
    <div>
      <NavItem
        title="My videos"
        onClick={() => setIsUpload(!isUpload)}
        upload={true}
        onSearch={(text) => setIsSearch(text)}
        placeholder="Search Videos"
      />
      <div>
        <div className="flex items-center space-x-4 pb-2 pt-10">
          <span className="font-medium text-blacks">
            {isCheck
              ? `Selected Videos : ${selectedVideoIds?.length || 0}`
              : `Total Videos: ${userVideos?.meta?.total || 0}`}
          </span>
          {selectedVideoIds?.length > 0 && (
            <>
              <DeleteBtn onClick={handleDeleteAll} />
            </>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-blacks">
              <TableHead className="w-[220px] space-x-[7px]">
                <Checkbox
                  id="select-all"
                  checked={isCheck}
                  onCheckedChange={(checked) => setIsCheck(checked as boolean)}
                />
                <label htmlFor="select-all" className="cursor-pointer">
                  Videos
                </label>
              </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Dislikes</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <SkeletonCount count={6}>{SkeletonVideosAll()}</SkeletonCount>
            ) : userVideos?.data?.length > 0 ? (
              userVideos?.data?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex gap-5 items-center mr-5 w-[500px] md:w-[650px] overflow-hidden">
                      {isCheck && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`select-${item.id}`}
                            checked={selectedVideoIds.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelect(item.id, checked as boolean)
                            }
                          />
                        </div>
                      )}
                      <div className="flex group space-x-4">
                        <div className="w-[150px] h-[95px]">
                          <ImgBox
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-[150px] h-[95px] rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold block break-all whitespace-normal text-blacks text-lg !line-clamp-2 lg:truncate">
                            {item.title}
                          </div>

                          <div className="lg:group w-full text-sm cursor-pointer text-grays relative">
                            <div className="hidden lg:block lg:group-hover:!hidden">
                              <div
                                className="*:!font-normal !h-[60px] overflow-hidden"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></div>
                            </div>

                            <div className="lg:hidden  lg:group-hover:block">
                              <ul className="flex items-center space-x-2 mt-3">
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={`/dashboard/video-details/${item.id}?tab=details`}
                                  >
                                    <FavIcon
                                      name="eye"
                                      className="size-5"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={`/dashboard/video-details/${item.id}?tab=analytics`}
                                  >
                                    <FavIcon
                                      name="analytics"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={`/dashboard/edit-video/${item.id}`}
                                  >
                                    <FavIcon
                                      name="edit"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={`/dashboard/video-details/${item.id}?tab=comments`}
                                    className="relative top-[2px]"
                                  >
                                    <FavIcon
                                      name="comnet"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li
                                  className="hover:border rounded-md size-8 grid place-items-center hover:bg-white"
                                  onClick={() => SingleVideoDelete(item.id)}
                                >
                                  <FavIcon
                                    name="delete"
                                    className="size-4"
                                    color="#535353"
                                    hoverColor="#ef4444"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="inline-flex w-max items-center space-x-1 border rounded-full px-2 py-1 text-blacks">
                      <Icon name="internetBlack" width={17} height={17} />
                      <span>{item.visibility}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="w-[120px] md:w-fit">
                        <ul className="[&>li]:text-grays space-y-1">
                      <li className="flex items-center space-x-2">
                        <Icon name="calenderGarys" width={17} height={17} />
                        <span>{item?.created_date}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="timegrays" width={17} height={17} />
                        <span>{item?.created_time}</span>
                      </li>
                    </ul>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-blacks">{item.views}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.likes_count}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.dislikes_count}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.comments_count}</div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableNoItem
                title="No videos found in your My Videos"
                className="xl:py-40"
                colSpan={7}
              />
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && (
        <ul className="flex flex-wrap justify-end my-7">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => setIsPage(v)}
              {...userVideos?.meta}
            ></Pagination>
          </li>
        </ul>
      )}
      {/* modal upload */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a New Video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsUpload={setIsUpload} />
      </Modal>
    </div>
  );
}

function SkeletonVideosAll() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-5 items-center pr-5 w-[700px] overflow-hidden">
          <div className="flex space-x-4">
            <div className="w-[150px] h-[95px]">
              <Skeleton className="w-[150px] h-[95px] rounded-md" />
            </div>
            <div className="flex-1 space-y-2 mt-2">
              <Skeleton className="w-[300px] h-4 rounded-sm" />
              <Skeleton className="w-[500px] h-4 rounded-sm" />
              <Skeleton className="w-[500px] h-4 rounded-sm" />
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="w-[110px] h-8 rounded-md" />
      </TableCell>

      <TableCell>
        <div className="space-y-2">
          <Skeleton className="w-[110px] h-4 rounded-sm" />
          <Skeleton className="w-[110px] h-4 rounded-sm" />
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
    </TableRow>
  );
}
