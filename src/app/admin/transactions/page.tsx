"use client";
import { CustomTable } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { useGetTransactionsQuery } from "@/redux/api/admin/pricingApi";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

export default function Channels() {
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: transactions, isLoading } = useGetTransactionsQuery({
    ...query,
  });
  const headers = ["Sl. No", "Channel name", "Reason", "Amount"];

  return (
    <div>
      <NavTitle
        title="Transactions"
        subTitle="You can see  all the transactions of MyTSV from here"
      />
      <ul className="flex justify-between">
        <li>
          {" "}
          <SearchBox
            placeholder="Search transactions"
            onSearch={(text) => setIsSearch(text)}
            className="min-w-md"
          />
        </li>
        <li>
          <Button
            variant={"primary"}
            className="rounded-full h-full px-6 cursor-default"
          >
            <ul className="flex items-center [&>li]:text-base [&>li]:font-normal [&>li]:first:mr-9">
              <li className="flex items-center">
                <FavIcon name="doller" className="mr-2 size-5" />
                Earned this month
              </li>
              <li>{transactions?.earned_this_month || 0}</li>
            </ul>
          </Button>
        </li>
      </ul>
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : transactions?.data?.length > 0 ? (
            transactions?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* Sl No */}
                <TableCell>{index+1}</TableCell>

                {/* Channel Name with Image */}
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.user?.avatar}
                      fallback={item?.user?.channel_name}
                      alt="profile"
                      fallbackStyle="avatar"
                    />
                    <span>{item?.user?.channel_name}</span>
                  </div>
                </TableCell>

                {/* Reason */}
                <TableCell>{item.reason}</TableCell>

                {/* Amount */}
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No transactions are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...transactions?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
    </div>
  );
}
