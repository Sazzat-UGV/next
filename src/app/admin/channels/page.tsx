"use client";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import {
  useChannelDeleteMutation,
  useGetChannelsQuery,
} from "@/redux/api/admin/channelApi";
import { Pagination } from "@/components/reuseable/pagination";
import Avatars from "@/components/reuseable/avater";
import { TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

export default function Channels() {
  const { confirm } = useConfirmation();
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: channels, isLoading } = useGetChannelsQuery({ ...query });
  const [channelDelete] = useChannelDeleteMutation();
  const headers = [
    "Sl. No",
    "Channel name",
    "Email",
    "Videos",
    "Views",
    "Likes",
    "Action",
  ];

  const handleDeleteChannel = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this channel",
      description:
        "After deleting, users can't find this channel and videos anymore",
    });
    if (con) {
      await channelDelete(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Channels"
        subTitle="You can see & manage all the channels of MyTSV from here."
      />
      <SearchBox
        placeholder="Search Channels"
        onSearch={(text) => setIsSearch(text)}
      />

      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : channels?.data?.length > 0 ? (
            channels?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* Sl No */}
                <TableCell>{index + 1}</TableCell>

                {/* Channel Name with Image */}
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.avatar}
                      fallback={item.channel_name}
                      alt={item.channel_name}
                      fallbackStyle="avatar"
                    />
                    <span>{item.channel_name}</span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell>{item.email}</TableCell>

                {/* Videos */}
                <TableCell>{item.videos_count}</TableCell>

                {/* Views */}
                <TableCell>{item.views_count_formated}</TableCell>

                {/* Likes */}
                <TableCell>{item.likes_count_formated}</TableCell>

                {/* Action Buttons */}
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Link href={`/admin/channels/${item.id}`}>
                        <Previewbtn />
                      </Link>
                    </li>
                    <li>
                      <Deletebtn onClick={() => handleDeleteChannel(item.id)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No channels are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...channels?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
    </div>
  );
}
