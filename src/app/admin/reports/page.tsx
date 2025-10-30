"use client";
import ReportView from "@/components/common/admin/basic/report-view";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { TakeOptions } from "@/dummy-data";
import FavIcon from "@/icon/admin/favIcon";
import { delay, modifyPayload } from "@/lib";
import { useReportActionMutation } from "@/redux/api/admin/channelApi";
import {
  useGetAreportQuery,
  useGetReportADetailsQuery,
  useReportADeleteMutation,
} from "@/redux/api/admin/reportsApi";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";


const initTakeInfo = {
  id: "",
  video_id: "",
  channel_name: "",
  issue: "",
  action_name: "",
};

export default function Reports() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const [isPage, setIsPage] = useState<number>(1);
  const [takeInfo, setTakeInfo] = useState<any>(initTakeInfo);
  const { data: info } = useGetReportADetailsQuery(takeInfo?.id, {
    skip: !takeInfo?.id,
  });
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: reports, isLoading } = useGetAreportQuery({ ...query });
  const [reportADelete] = useReportADeleteMutation();
  const headers = [
    "Sl. No",
    "Report from",
    "Reported channel",
    "Reason",
    "Action",
  ];

  const [reportAction, { isLoading: reportLoading }] =
    useReportActionMutation();
  const handleTakeAction = async () => {
    const value = {
      action_name: takeInfo.action_name,
      action_issue: takeInfo.issue,
      video_id: takeInfo?.video_id,
      make_new: "yes",
    };
    const mainid = takeInfo?.id;
    const data = modifyPayload(value);
    const res = await reportAction({ mainid, data }).unwrap();
    if (res.status) {
      toast.success("Take Action Successfully", {
        description:
          "The requested action has been processed and completed successfully",
      });
      await delay(4050);
      setIsTake(false);
      setIsPreview(false);
      setTakeInfo(initTakeInfo);
    }
  };

  const handleDelete = async (id:string) => {
    const con = await confirm({
      title: "You are going to delete this report",
      description: "After deleting, users can't find this report anymore",
      icon: "i2",
    });
    if (con) {
      await reportADelete(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Reports"
        subTitle="You can see & manage all the reports of MyTSV from here."
      />
      <div className="flex justify-between items-center">
        <SearchBox
          placeholder="Search Reports"
          onSearch={(text) => setIsSearch(text)}
        />
        <Link href="/admin/appeals">
          <Button variant="primary" size="lg" className="rounded-full">
            Appeals ({reports?.total_appeals || 0})
          </Button>
        </Link>
      </div>

      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : reports?.data?.length > 0 ? (
            reports?.data?.map((item: any,index:any) => (
              <TableRow key={item?.id}>
                {/* Sl No */}
                <TableCell>{index+1}</TableCell>

                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.user?.avatar}
                      fallback={item.user?.name}
                      alt={item?.user?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.user?.name}</span>
                  </div>
                </TableCell>

                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.video?.user?.avatar}
                      fallback={item?.video?.user?.channel_name}
                      alt={item?.video?.user?.channel_name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.video?.user?.channel_name}</span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell>{item.reason}</TableCell>

                {/* Action Buttons */}
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn
                        onClick={() => {
                          setTakeInfo({
                            id: item?.id,
                            video_id: item?.video?.id,
                            channel_name: item?.video?.user?.channel_name,
                            issue: item?.reason,
                            action_name: item?.action_name,
                          });
                          setIsPreview(!isPreview);
                        }}
                      />
                    </li>
                    <li>
                      <Deletebtn onClick={() => handleDelete(item?.id)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No reports are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...reports?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
      {/* preview box */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title={takeInfo?.channel_name || ""}
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <ReportView
          options={TakeOptions}
          onChange={(value: any) => {
            setTakeInfo({ ...takeInfo, action_name: value });
            setIsTake(true);
          }}
          item={info}
        />
      </Modal>
      {/* isTake */}
      <Modal
        open={isTake}
        setIsOpen={setIsTake}
        className="sm:max-w-3xl"
        title={takeInfo?.channel_name}
        titleStyle="text-center"
      >
        <h1 className="text-lg text-center font-semibold text-blacks">
          {info?.video?.title}
        </h1>
        <h1 className="flex items-center justify-center my-5 text-white alart py-3">
          <FavIcon name="alert" className="mr-2" />
          {takeInfo?.action_name}
        </h1>
        <Textarea
          className="w-full rounded-3xl  pl-3 pr-3 py-3  text-blacks resize-none   text-sm min-h-45"
          placeholder="What is the issue ?"
          onChange={(e) => {
            setTakeInfo({
              ...takeInfo,
              issue: e.target.value,
            });
          }}
        />
        <Button
          disabled={reportLoading}
          variant="primary"
          className="rounded-full mt-2 float-right"
          onClick={() => handleTakeAction()}
        >
          Take action
        </Button>
      </Modal>
    </div>
  );
}
