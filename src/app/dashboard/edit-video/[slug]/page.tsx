"use client";
import VideoPlayer from "@/components/common/video-player";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import {
  InputSelectField,
  InputSelectFieldIcon,
} from "@/components/reuseable/from-select";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button, Input, Label } from "@/components/ui";
import {
  useCategoriesQuery,
  useVideosDetailsQuery,
} from "@/redux/api/landing/videosApi";
import { ArrowLeft, CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/admin/favIcon";
import VideoUpload from "@/components/reuseable/video-uplod";
import { useVideoEditMutation } from "@/redux/api/dashboard/videosApi";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { useGetCitiesQuery, useGetStatesQuery } from "@/redux/api/commonApi";
import { modifyPayloadAll } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/icon";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import { useParams } from "next/navigation";

const intImg = {
  videoPreview: "",
  thumbnailPreview: "",
  thumbnail: "",
  video: "",
};

export default function EditVideo() {
  const {slug}=useParams() as any
  const [isLink, setIsLink] = useState("");
  const [isImg, setIsImg] = useState<any>(intImg);
  const { data: categories } = useCategoriesQuery({
    per_page: 1000,
  });
  const { data } = useVideosDetailsQuery(slug);
  const [videoEdit, { isLoading: editLoading }] = useVideoEditMutation();

  const [isSelect, setIsSelect] = useState({
    state: [],
    city: [],
  });
  //  ============ state ================
  const { data: states } = useGetStatesQuery({});
  useEffect(() => {
    if (!states?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      state: states.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [states]);

  const {
    video,
    thumbnail,
    title,
    states: state,
    city,
    description,
    visibility,
    tags,
    category_id,
    type,
    link,
  } = data || {};
  const defaultId = states?.find(
    (i: any) => i.name.toLowerCase() === state?.toLowerCase()
  )?.id;

  // ============== from ==============
  const from = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      state: defaultId?.toString() || "",
      city: city || "",
      category_id: category_id?.toString(),
      visibility: visibility,
      tags: tags || [],
    },
  });

  //  ============= city===========
  const stateId = from.watch("state");
  const { data: citys } = useGetCitiesQuery(stateId, {
    skip: !stateId,
  });

  const stateName =
    stateId &&
    states?.find((item: any) => item?.id === parseInt(stateId))?.name;

  useEffect(() => {
    if (!citys?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      city: citys.map(({ name, id }: any) => ({
        label: name,
        value: name,
      })),
    }));
  }, [citys, stateId]);

  //  ============== from set value===============
  useEffect(() => {
    if (data) {
      from.reset({
        title,
        description,
        state: stateId || defaultId?.toString(),
        city,
        category_id: category_id?.toString(),
        visibility,
        tags: tags,
      });
    }
    setIsLink(link);
  }, [
    data,
    from,
    category_id,
    visibility,
    slug,
    city,
    description,
    states,
    tags,
    title,
    link,
    defaultId,
    stateId,
  ]);

  // handleSubmit
  const handleSubmit = async (values: FieldValues, id: string) => {
    const { state, category_id, ...rest } = values;
    const value = {
      ...rest,
      category_id: parseInt(values.category_id),
      states: stateName,
      _method: "PUT",
      ...(isLink && { link: isLink }),
      ...(isImg?.thumbnail && { thumbnail: isImg?.thumbnail }),
      ...(isImg.video && { video: isImg.video }),
    };
    try {
      const data = modifyPayloadAll(value);
      const res = await videoEdit({ data, id }).unwrap();
      if (res.status) {
        from.reset();
        setIsImg(intImg);
        setIsLink("");
      }
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  // ✅ **NEW: Centralized function to undo all changes**
  const handleUndoChanges = () => {
    if (data) {
      from.reset();
    }
    setIsImg(intImg);
    setIsLink("");
  };

  return (
    <Form from={from} onSubmit={(values) => handleSubmit(values, slug)}>
      <div className="pb-10">
        <ul className="flex justify-between items-center my-4">
          <li>
            <Link
              className="font-medium text-lg flex items-center"
              href={"/dashboard/my-videos"}
            >
              <ArrowLeft size={18} className="mr-3 font-bold" />
              Edit Video
            </Link>
          </li>
          <li className="flex gap-x-2">
            <Button
              variant={"primary"}
              size={"lg"}
              className="rounded-full bg-transparent text-blacks border shadow-none text-base"
              // ✅ **UPDATED: Use the new handler function**
              onClick={handleUndoChanges}
              type="button" // Add type="button" to prevent form submission
            >
              <Icon name="undoBlack" width={16} /> Undo changes
            </Button>
            <Button
              variant={"primary"}
              size={"lg"}
              className="rounded-full text-base"
              type="submit"
              disabled={editLoading}
            >
              <Icon name="saveWhite" width={16} />
              Save changes
            </Button>
          </li>
        </ul>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-9">
              <div className="relative">
                <VideoPlayer
                  type={type}
                  video={isImg?.videoPreview || video}
                  link={link}
                  thumbnail={isImg?.thumbnailPreview || thumbnail} // Also fallback for thumbnail
                  className="md:h-[450px]"
                />
                {type === "video" && (
                  <VideoUpload
                    onFileSelect={(file: File) => {
                      setIsImg({
                        ...isImg,
                        video: file,
                        videoPreview: URL.createObjectURL(file),
                      });
                    }}
                  >
                    <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-3 right-3 backdrop-blur-3xl bg-black/50">
                      <FavIcon className="size-4" name="editprofile" />
                    </div>
                  </VideoUpload>
                )}
              </div>
              {type === "link" && (
                <div className="relative">
                  <Label className="text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3">
                    Youtube Link
                  </Label>
                  <Input
                    value={isLink || ""}
                    onChange={(e) => setIsLink(e.target.value)}
                    className="h-12 w-full rounded-full pl-4 pr-3  text-blacks placeholder:text-grays  text-sm"
                  />
                </div>
              )}
              <FromInputs
                label="Title"
                name="title"
                placeholder="Enter your title"
              />
              <div>
                <TextEditor
                  className="min-h-[180px]"
                  value={from.watch("description") || ""}
                  onChange={(v) => {
                    from.setValue("description", v);
                  }}
                />
                {from?.formState?.errors?.description && (
                  <p className="text-reds justify-end mt-1 flex items-center gap-1 text-sm">
                    {from?.formState?.errors?.description?.message as string}
                    <CircleAlert size={14} />
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-8 border px-3 py-5  rounded-md">
              <InputSelectField
                items={isSelect?.state}
                label="State"
                name="state"
                placeholder="Select State"
                className="py-[23px]"
                itemStyle="py-2"
              />
              <InputSelectField
                items={isSelect?.city}
                label="City"
                name="city"
                placeholder="Select City"
                className="py-[23px]"
                itemStyle="py-2"
              />
              <InputSelectField
                items={categories?.data?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id?.toString(),
                }))}
                label="Category"
                name="category_id"
                placeholder="Select category"
              />
              <InputSelectFieldIcon
                items={[
                  {
                    label: "Everyone",
                    value: "Everyone",
                    icon: <Icon width={18} name="internetBlack" />,
                  },
                  {
                    label: "Only me",
                    value: "Only me",
                    icon: <Icon width={14} name="lockBack" />,
                  },
                ]}
                label="Visibility"
                name="visibility"
                placeholder="Select category"
              ></InputSelectFieldIcon>

              <FromTagInputs label="Tags" name="tags" />

              <div>
                <h1 className="font-semibold text-xl my-6">Thumbnail</h1>
                <div className="w-full h-auto  relative md:h-[300px] overflow-hidden">
                  <Image
                    src={isImg?.thumbnailPreview || thumbnail || "/blur.png"}
                    alt={"Thumbnail"}
                    width={400}
                    height={225}
                    className="w-full h-full rounded-md object-cover aspect-video"
                  />
                  <ImgUpload
                    onFileSelect={(file: File) => {
                      setIsImg({
                        ...isImg,
                        thumbnail: file,
                        thumbnailPreview: URL.createObjectURL(file),
                      });
                    }}
                  >
                    <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-3 right-3 backdrop-blur-3xl bg-black/50">
                      <FavIcon className="size-4" name="editprofile" />
                    </div>
                  </ImgUpload>
                </div>
                <h1 className="text-reds flex items-center gap-2 mt-2">
                  <Icon width={18} name="alertRed" />
                  Image resolution should be minimum 1080x528 px{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
