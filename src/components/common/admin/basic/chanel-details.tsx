"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/reuseable/modal";
import VideoPlayer from "../../video-player";
import SelectBox from "@/components/reuseable/select-box";
import FavIcon from "@/icon/admin/favIcon";
import { Button, Textarea } from "@/components/ui";
import { VideoCard2 } from "@/components/reuseable/video-card";
import { NoItemData } from "../reuseable/table-no-item";
import CommentChanel from "./chanel-com";
import { useReportActionMutation } from "@/redux/api/admin/channelApi";
import { delay, modifyPayload } from "@/lib";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const options = [
  { label: "Suspend for 7 days", value: "Suspend for 7 days" },
  { label: "Suspend for 30 days", value: "Suspend for 30 days" },
  { label: "Give a warning", value: "Give a warning" },
  { label: "Suspend permanently", value: "Suspend permanently" },
];

const initTakeInfo = {
  id: "",
  title: "",
  channel_name: "",
  issue: "",
  action_name: "",
};

export default function ChannelBox({ totalVideos }: any) {
  const { id } = useParams();
  const [takeInfo, setTakeInfo] = useState<any>(initTakeInfo);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const [isMore,setIsMore]=useState<boolean>(false)
  const [isVideo, setIsVideo] = useState<any>();
  const [reportAction, { isLoading }] = useReportActionMutation();

  useEffect(() => {
    if (!isVideo) {
      setIsVideo({});
    }
  }, [isVideo]);

  const handleTakeAction = async () => {
    const value = {
      action_name: takeInfo.action_name,
      action_issue: takeInfo.issue,
      video_id: takeInfo.id,
      make_new: "yes",
    };
    const data = modifyPayload(value);
    const res = await reportAction({ id, data }).unwrap();
    if (res.status) {
      toast.success("Take Action Successfully", {
        description:
          "The requested action has been processed and completed successfully",
      });
      await delay(4050);
      setIsShow(false);
      setIsTake(false);
      setTakeInfo(initTakeInfo);
    }
  };
  return (
    <div>
      <div className="home gap-6">
        {totalVideos?.length > 0 ? (
          totalVideos.map((video: any) => (
            <div
              key={video.id}
              className="cursor-pointer"
              onClick={() => {
                setIsVideo(video);
                setIsShow(!isShow);
              }}
            >
              <VideoCard2 item={video} />
            </div>
          ))
        ) : (
          <NoItemData
            title="this channel has no video"
            className="col-span-4 w-full"
          />
        )}
      </div>
      {/* modal box */}
      <Modal
        open={isShow}
        setIsOpen={setIsShow}
        title={isVideo?.user?.channel_name}
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <VideoPlayer
              type={isVideo?.type}
              video={isVideo?.video}
              link={isVideo?.link}
              thumbnail={isVideo?.thumbnail}
              className="md:h-[300px]"
            />
            <div className="pt-5">
              <SelectBox
                items={options}
                onChange={(value) => {
                  if (value?.length > 0) {
                    setIsTake(true);
                    setTakeInfo({
                      ...takeInfo,
                      id: isVideo?.id,
                      action_name: value,
                      channel_name: isVideo?.user?.channel_name,
                      title: isVideo?.title,
                    });
                  }
                }}
                placeholder="Take action"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-semibold text-blacks">
              {isVideo?.title}
            </h1>
              <div className="border p-2 rounded-md my-5">
                  <p className="text-sm text-blacks font-semibold">
                   {isVideo?.created_at_format}
                  </p>
                  <div
                    className={`mt-1 relative text-sm ${
                      isMore ? "h-full" : "h-[50px] !overflow-hidden"
                    }  text-grays leading-relaxed`}
                  >
                    <div className="ql-container ql-snow">
                      <div
                        className="ql-editor !overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: isVideo?.description }}
                      ></div>
                    </div>
                    {isMore && (
                      <h1
                        className="cursor-pointer"
                        onClick={() => setIsMore(false)}
                      >
                        Show Less
                      </h1>
                    )}
                    {!isMore && (
                      <h1
                        onClick={() => setIsMore(true)}
                        className="absolute left-0 bottom-0 cursor-pointer"
                      >
                        See More....
                      </h1>
                    )}
                  </div>
                </div>
            {/* CommentChanel ======== */}
            <div className="border rounded-md p-3">
              {!!isVideo?.id && <CommentChanel id={isVideo?.id} />}
            </div>
          </div>
        </div>
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
          {takeInfo?.title}
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
          onClick={() => handleTakeAction()}
          variant="primary"
          className="rounded-full mt-2 float-right"
          disabled={isLoading}
        >
          Take action
        </Button>
      </Modal>
    </div>
  );
}
