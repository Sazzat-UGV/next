"use client";
import TabBox from "@/components/common/dashboard/video-tab/tab-box";
import { Button } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { ArrowLeft } from "lucide-react";
import { FromShow } from "@/components/reuseable/input-show";
import VideoPlayer from "@/components/common/video-player";
import { FromTagShow } from "@/components/reuseable/from-tag-show";
import { useVideosDetailsQuery } from "@/redux/api/landing/videosApi";
import { useSingleDeleteMutation } from "@/redux/api/dashboard/videosApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/icon";
import React from "react";

export default function Details({ slug, isTab, setIsTab }: any) {
  const router = useRouter();
  const { data, isLoading } = useVideosDetailsQuery(slug);
  const [singleDelete, { isLoading: deleteLoading }] =
    useSingleDeleteMutation();
  const { confirm } = useConfirmation();

  const {
    type,
    id,
    video,
    thumbnail,
    title,
    states,
    city,
    description,
    category,
    visibility,
    tags,
    link,
  } = (!isLoading && data) || {};

  //handleDelete
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
      titleStyle: "px-10",
    });
    if (con) {
      const res = await singleDelete(id).unwrap();
      if (res.status) {
        router.push("/dashboard/my-videos");
      }
    }
  };

  return (
    <div>
      <ul className="flex items-center justify-between my-4">
        <li>
          <Link
            className="font-medium text-lg flex items-center"
            href={"/dashboard/my-videos"}
          >
            <ArrowLeft size={18} className="mr-3 font-bold" />
            Video details
          </Link>
        </li>
        <li className="flex gap-x-2">
          <Link href={`/dashboard/edit-video/${id}`}>
            <Button
              variant={"primary"}
              size={"lg"}
              className="rounded-full bg-transparent text-blacks border px-3 lg:px-4 shadow-none text-base"
            >
              {" "}
              <Icon name="editBlack" />
              <span className="hidden md:block">Edit this video</span>
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(id)}
            variant={"primary"}
            size={"lg"}
            className="rounded-full text-base  px-4 lg:px-4"
            disabled={deleteLoading}
          >
            <Icon name="deleteWhite" />
            <span className="hidden md:block">Delete this video</span>
          </Button>
        </li>
      </ul>
      <TabBox isTab={isTab} setIsTab={setIsTab} className="my-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div>
          <VideoPlayer
            type={type}
            video={video}
            link={link}
            thumbnail={thumbnail}
            className="md:h-[450px]"
          />
          <h1 className="text-xl font-medium mt-6">{title}</h1>
          <div className="ql-container ql-snow">
            <div
              className="ql-editor !overflow-hidden"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        </div>
        <div className="border p-3 py-6 rounded-xl">
          <div className="space-y-8">
            <FromShow label="State" value={states || ""} />
            <FromShow label="City" value={city || ""} />
            <FromShow label="Category" value={category?.name || ""} />
            <FromShow label="Visibility" value={visibility || ""} />
            <FromTagShow name="specialties" label="Specialties" tags={tags} />
          </div>
          <div>
            <h1 className="font-semibold text-xl my-6">Thumbnail</h1>
            <div className="w-full h-auto md:w-[600px] md:h-[300px]">
              <Image
                src={thumbnail || "/blur.png"}
                alt="Thumbnail"
                width={400}
                height={225}
                className="w-full h-full rounded-md object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
