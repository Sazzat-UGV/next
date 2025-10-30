"use client";
import ReportView from "@/components/common/admin/basic/report-view";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/icon-list";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import FavIcon from "@/icon/admin/favIcon";
import {
  useAppealADeleteMutation,
  useGetAappealsQuery,
  useGetAppealADetailsQuery,
  useGetReportADetailsQuery,
  useTakeActionAppealMutation,
} from "@/redux/api/admin/reportsApi";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/common/video-player";

const intId = {
  id: "",
  channel_name: "",
  report_id: "",
};

export default function Appeals() {
  const { confirm } = useConfirmation();
  const [reportView, setReportView] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [isPage, setIsPage] = useState<number>(1);
  const { data: appeal, isLoading } = useGetAappealsQuery({ page: isPage });
  const [appealADelete] = useAppealADeleteMutation();
  const [isId, setIsId] = useState(intId);
  const { data: appealDetails } = useGetAppealADetailsQuery(isId?.id, {
    skip: !isId?.id,
  });
  const { data: info } = useGetReportADetailsQuery(isId?.report_id, {
    skip: !isId?.report_id,
  });
  const [takeActionAppeal] = useTakeActionAppealMutation();
  const headers = ["Sl. No", "Appeal from", "Subject", "Action"];

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this Appeals channel",
      description:
        "After deleting, users can't find this Appeals channel and videos anymore",
      icon: "i2",
    });
    if (con) {
      await appealADelete(id).unwrap();
    }
  };

  // isPreview
  useEffect(() => {
    if (!isView) {
      setIsId(intId);
    }
  }, [isView]);

  const handleDecline = async (id: string) => {
    const con = await confirm({
      title: "This appeal from Haircut pro has been Appeal declined",
      description:
        "User's can find this video on their feed or their search results.",
      cancelText: "Close",
      confirmText: "Submit",
      className: "px-10",
      btnStyle: "py-4 px-10",
      icon: "i2",
    });
    if (con) {
      const data = new FormData();
      data.append("action_name", "decline");
      await takeActionAppeal({ id, data }).unwrap();
    }
  };
  const handleAccept = async (id: string) => {
    const con = await confirm({
      title: "This appeal from Haircut pro has been Appeal accepted",
      description:
        "Now users can find this video on their feed or their search results.",
      cancelText: "Close",
      confirmText: "Submit",
      className: "px-10",
      btnStyle: "py-4 px-10",
      titleStyle: "text-greens",
      icon: "i3",
    });
    if (con) {
      const data = new FormData();
      data.append("action_name", "accept");
      await takeActionAppeal({ id, data }).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Appeals"
        subTitle="You can see & manage all the appeals of MyTSV from here."
      />
      <div className="flex justify-between items-center">
        <Link href="/admin/reports">
          <BackBtn iconStyle="bg-body" className="gap-x-0" />
        </Link>
      </div>

      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : appeal?.data?.length > 0 ? (
            appeal?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* Sl No */}
                <TableCell>{index+1}</TableCell>

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

                {/* Email */}
                <TableCell>{item.subject}</TableCell>

                {/* Action Buttons */}
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn
                        onClick={() => {
                          setIsId({
                            id: item.id,
                            channel_name: item?.user?.channel_name,
                            report_id: item?.report_id,
                          });
                          setIsView(!isView);
                        }}
                      />
                    </li>
                    <li>
                      <Deletebtn onClick={() => handleDelete(item.id)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No Appeals are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...appeal?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
      {/* view box */}
      <Modal
        open={isView}
        setIsOpen={setIsView}
        title={isId?.channel_name || ""}
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <div className="space-y-7 py-5">
          <div className="space-y-10">
            <div className="relative">
              {/* subject */}
              <div className="h-12 w-full rounded-full pl-4 pr-3 border flex items-center text-blacks placeholder:text-grays  text-sm">
                {appealDetails?.subject}
              </div>
              <div className="text-blacks text-base font-medium absolute -top-3 left-7 bg-white px-3">
                Subject
              </div>
            </div>
            {/* explanation */}
            <div className="relative">
              <Textarea
                className="w-full min-h-44 rounded-3xl  pl-3 pr-3 py-3  text-blacks resize-none   text-sm"
                placeholder={"Enter Your explanation"}
                value={appealDetails?.explanation || ""}
                readOnly
              />
              <div
                className={
                  "text-blacks text-base font-medium absolute -top-3 left-7 bg-white px-3"
                }
              >
                Explanation
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-between">
            <div className="flex space-x-2 items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleAccept(isId.id)}
                className="rounded-full bg-greens"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleDecline(isId.id)}
                variant="primary"
                size="lg"
                className="rounded-full"
              >
                Decline
              </Button>
            </div>
            <Button
              onClick={() => setReportView(!reportView)}
              variant="outline"
              size="lg"
              className="rounded-full bg-transparent hover:bg-transparent"
            >
              See report <ArrowRight />
            </Button>
          </div>
        </div>
      </Modal>
      {/* see take */}
      <Modal
        open={reportView}
        setIsOpen={setReportView}
        className="sm:max-w-5xl"
        title={isId?.channel_name || ""}
        titleStyle="text-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 pb-8">
          <div>
            <VideoPlayer
              type={info?.video?.type}
              video={info?.video?.video}
              link={info?.video?.link}
              thumbnail={info?.video?.thumbnail}
              className="h-[300px]"
            />
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
              <div className="flex items-center gap-3">
                <Avatars
                  src={info?.video?.user?.avatar}
                  fallback={info?.video?.user?.channel_name}
                  alt="Channel Avatar"
                />
                <div className="flex-1">
                  <Link href="#" className="font-semibold text-gray-900">
                    {info?.video?.user?.channel_name}
                  </Link>
                </div>
              </div>
              {/* right */}
              <div className="flex mt-2 md:mt-0 flex-wrap items-center gap-x-4 gap-y-2  text-sm has-[>div]:cursor-pointer">
                <div className="flex   border px-3 space-x-1 h-8 items-center rounded-full">
                  <FavIcon name="eye" color="#888888" className="size-6" />
                  <span className="text-blacks font-semibold">
                    {info?.video?.views_count_formatted}
                  </span>
                </div>
                <div className="flex  border px-3 h-8 space-x-1 items-center rounded-full">
                  <FavIcon
                    name="likeUp"
                    color="#888888"
                    className="size-5 relative mb-[1px]"
                  />
                  <span className="text-blacks font-semibold">
                    {info?.video?.likes_count_formatted}
                  </span>
                </div>
                <div className="flex border px-3 h-8 items-center space-x-1 rounded-full">
                  <FavIcon
                    name="likeDown"
                    color="#888888"
                    className="size-5 relative mr-1 top-[2px]"
                  />
                  <span className="text-blacks font-semibold">
                    {info?.video?.dislikes_count_formatted}
                  </span>
                </div>
                <div className="flex  border px-3 h-8 items-center space-x-1 rounded-full">
                  <FavIcon
                    name="comnet"
                    color="#888888"
                    className="size-5 relative top-[2px]"
                  />
                  <span className="text-blacks font-semibold">
                    {info?.video?.comments_count_formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-lg lg:text-xl font-semibold text-blacks">
              {info?.video?.title}
            </h1>
            <div className="border p-3 rounded-md  shadow-xs">
              <p className="text-sm text-blacks font-semibold">10 hours ago</p>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                {info?.video?.description}
              </p>
            </div>
            <ul className="flex justify-between h-12 border rounded-full items-center px-2">
              <li>Reason</li>
              <li className="text-reds flex  items-center">
                {info?.reason}
                <FavIcon className="ml-2" name="question" />
              </li>
            </ul>
            <div className="border rounded-md p-3">
              <h1 className="text-reds text-lg font-medium">Issue</h1>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                {info?.issue}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
