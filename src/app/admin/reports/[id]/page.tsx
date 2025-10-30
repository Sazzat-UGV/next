"use client";

import ReportView from "@/components/common/admin/basic/report-view";
import { TakeOptions } from "@/dummy-data";
import FavIcon from "@/icon/admin/favIcon";
import { delay, modifyPayload } from "@/lib";
import { useReportActionMutation } from "@/redux/api/admin/channelApi";
import { useGetReportADetailsQuery } from "@/redux/api/admin/reportsApi";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import VideoPlayer from "@/components/common/video-player";
import Avatars from "@/components/reuseable/avater";
import Link from "next/link";
import SelectBox from "@/components/reuseable/select-box";
import { Button, Textarea } from "@/components/ui";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/common/admin/reuseable/nav-title";

const initTakeInfo = {
  id: "",
  video_id: "",
  channel_name: "",
  issue: "",
  action_name: "",
};

export default function ReportDetails() {
  const { id } = useParams();
  const [takeInfo, setTakeInfo] = useState<any>(initTakeInfo);
  const [isTake, setIsTake] = useState<boolean>(false);
  const { data: info } = useGetReportADetailsQuery(id);
  const [reportAction, { isLoading: reportLoading }] =
    useReportActionMutation();

  // handleTakeAction
  const handleTakeAction = async () => {
    const value = {
      action_name: takeInfo.action_name,
      action_issue: takeInfo.issue,
      video_id: takeInfo?.video_id,
      make_new: "yes",
    };
    const data = modifyPayload(value);
    const res = await reportAction({ id, data }).unwrap();
    if (res.status) {
      toast.success("Take Action Successfully", {
        description:
          "The requested action has been processed and completed successfully",
      });
      await delay();
      setIsTake(false);
      setTakeInfo(initTakeInfo);
    }
  };

  const { video, reason, issue } = info || {};
  return (
    <div className="md:px-10">
      <NavTitle
        title="Report Details"
        subTitle="You can see & manage the report details of MyTSV from here"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6 pb-8">
        <div>
          <VideoPlayer
            type={video?.type}
            video={video?.video}
            link={video?.link}
            thumbnail={video?.thumbnail}
            className="md:h-[520px]"
          />
          <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
            <div className="flex items-center gap-3">
              <Avatars
                src={video?.user?.avatar}
                fallback={video?.user?.channel_name}
                alt="Channel Avatar"
              />
              <div className="flex-1">
                <Link href="#" className="font-semibold text-gray-900">
                  {video?.user?.channel_name}
                </Link>
              </div>
            </div>
            {/* right */}
            <div className="flex mt-2 md:mt-0 flex-wrap items-center gap-x-4 gap-y-2  text-sm has-[>div]:cursor-pointer">
              <div className="flex   border px-3 space-x-1 h-8 items-center rounded-full">
                <FavIcon name="eye" color="#888888" className="size-6" />
                <span className="text-blacks font-semibold">
                  {video?.likes_count_formatted}
                </span>
              </div>
              <div className="flex  border px-3 h-8 space-x-1 items-center rounded-full">
                <FavIcon
                  name="likeUp"
                  color="#888888"
                  className="size-5 relative mb-[1px]"
                />
                <span className="text-blacks font-semibold">
                  {video?.views_count_formatted}
                </span>
              </div>
              <div className="flex border px-3 h-8 items-center space-x-1 rounded-full">
                <FavIcon
                  name="likeDown"
                  color="#888888"
                  className="size-5 relative mr-1 top-[2px]"
                />
                <span className="text-blacks font-semibold">
                  {video?.dislikes_count_formatted}
                </span>
              </div>
              <div className="flex  border px-3 h-8 items-center space-x-1 rounded-full">
                <FavIcon
                  name="comnet"
                  color="#888888"
                  className="size-5 relative top-[2px]"
                />
                <span className="text-blacks font-semibold">
                  {video?.comments_count_formatted}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <SelectBox
              items={TakeOptions}
              onChange={(value: any) => {
                setTakeInfo({
                  ...takeInfo,
                  action_name: value,
                  id: video?.id,
                  video_id: video?.id,
                  channel_name: video?.user?.channel_name,
                });
                setIsTake(true);
              }}
              placeholder="Take action"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-lg lg:text-xl font-semibold text-blacks">
            {video?.title}
          </h1>
          <div className="border p-3 rounded-md  shadow-xs">
            <p className="text-sm text-blacks font-semibold">10 hours ago</p>
            <p className="mt-1  text-sm text-grays leading-relaxed">
              {video?.description}
            </p>
          </div>
          <ul className="flex justify-between h-12 border rounded-full items-center px-2">
            <li>Reason</li>
            <li className="text-reds flex  items-center">
              {reason}
              <FavIcon className="ml-2" name="question" />
            </li>
          </ul>
          <div className="border rounded-md p-3">
            <h1 className="text-reds text-lg font-medium">Issue</h1>
            <p className="mt-1  text-sm text-grays leading-relaxed">{issue}</p>
          </div>
        </div>
      </div>
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
          onChange={(e: any) => {
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
