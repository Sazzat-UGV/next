"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import Img from "@/components/reuseable/img";
import Modal from "@/components/reuseable/modal";
import { Button, Card, Skeleton } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "@/redux/api/admin/aboutApi";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import avaterImg from "@/assets/avaterImg.svg";
import ImgUpload from "@/components/reuseable/img-uplod";
import Image from "next/image";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import { modifyPayload } from "@/lib";
import { toast } from "sonner";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";

const initImg = {
  icon: "",
  iconPreview: "",
};

const intEdit = {
  id: "",
  icon: "",
  title: "",
  description: "",
};

export default function AboutUs() {
  const { data, isLoading } = useGetAboutQuery({});
  const [editOpen, setEditOpen] = useState(false);
  const [isImg, setIsImg] = useState<any>(initImg);
  const [editInfo, setEditInfo] = useState(intEdit);
  const [updateAbout, { isLoading: updateLoading }] = useUpdateAboutMutation();

  // rest edit info
  useEffect(() => {
    if (!editOpen) {
      setEditInfo(intEdit);
      setIsImg(initImg);
    }
  }, [editOpen, isImg]);
  // edit  question
  const editfrom = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    editfrom.reset({
      title: editInfo.title,
      description: editInfo.description,
    });
  }, [editInfo, editfrom]);

  const editSubmit = async (values: FieldValues) => {
    try {
      const value = {
        ...values,
        _method: "PUT",
        ...(isImg.icon && { icon: isImg.icon }),
      };
      const data = modifyPayload(value);
      const res = await updateAbout({ id: editInfo.id, data }).unwrap();

      if (res.status) {
        toast.success("Update Successful", {
          description: "About us have been updated",
        });
        setEditOpen(false);
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, editfrom);
    }
  };

  // group items
  const firstGroup = data?.slice(0, 2);
  const secondGroup = data?.slice(2, 4);
  const lastItem = data?.[4];

  // reusable renderer
  const renderCard = (item: any) => (
    <Card key={item.id} className="gap-3 relative">
      <div className="flex items-center gap-x-5">
        <ImgBox
          src={item.icon}
          className="size-16 rounded-full"
          alt={item.title}
        ></ImgBox>

        <h3 className="text-2xl font-semibold text-blacks">{item.title}</h3>
      </div>
      <div
        className="space-y-2"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
      <h1
        onClick={() => {
          setEditInfo({
            id: item.id,
            icon: item.icon,
            title: item.title,
            description: item.description,
          });
          setEditOpen(true);
        }}
        className="absolute top-3 right-5 size-10 rounded-md border grid place-items-center cursor-pointer"
      >
        <FavIcon name="edit" color="#000000" />
      </h1>
    </Card>
  );

  return (
    <div>
      <NavTitle
        title="About us"
        subTitle="You can manage the about us section of MyTSV from here."
      />
      <div className="pt-10">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-3">
              <Skeleton className="min-h-[220px] w-full rounded-md" />
              <Skeleton className="h-[260px] w-full rounded-md" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-[260px] w-full rounded-md" />
              <Skeleton className="h-[220px] w-full rounded-md" />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              {/* first group (left side) */}
              <div className="col-span-1 lg:col-span-2 space-y-2">
                {firstGroup?.map(renderCard)}
              </div>

              {/* second group (right side) */}
              <div className="col-span-1 lg:col-span-3 space-y-2">
                {secondGroup?.map(renderCard, "h-1/2")}
              </div>
            </div>

            {/* Last Item */}
            {lastItem && (
              <Card key={lastItem.id} className="gap-3 mt-3 relative">
                <div className="flex items-center justify-center gap-x-5">
                  <Img
                    src={lastItem.icon}
                    className="size-16"
                    imgStyle="object-left-top object-fill"
                    title={lastItem.title}
                  />
                  <h3 className="text-2xl font-semibold text-blacks">
                    {lastItem.title}
                  </h3>
                </div>
                <div
                  className="space-y-2 text-center"
                  dangerouslySetInnerHTML={{ __html: lastItem.description }}
                />
                <h1
                  onClick={() => {
                    setEditInfo({
                      id: lastItem.id,
                      icon: lastItem.icon,
                      title: lastItem.title,
                      description: lastItem.description,
                    });
                    setEditOpen(true);
                  }}
                  className="absolute top-3 right-5 size-10 rounded-md border grid place-items-center cursor-pointer"
                >
                  <FavIcon name="edit" color="#000000" />
                </h1>
              </Card>
            )}
          </div>
        )}
      </div>

      {/*      {/*edit question*/}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit About Us"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <div>
            <ImgUpload
              onFileSelect={(file) => {
                setIsImg({
                  ...isImg,
                  icon: file,
                  iconPreview: URL.createObjectURL(file),
                });
              }}
              className="w-fit h-fit mx-auto"
            >
              <div className="relative size-25 mx-auto">
                <ImgBox
                  src={isImg.iconPreview || editInfo.icon || "/blur.png"}
                  className="size-25 p-[2px] mx-auto rounded-full"
                  alt="editInfo.title"
                ></ImgBox>
                <div className="size-9 z-50 absolute cursor-pointer grid place-items-center rounded-full bottom-0 right-0">
                  <Image
                    src={avaterImg}
                    alt="avaterimg"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </ImgUpload>
          </div>
          <FromInputs
            label="Title"
            name="title"
            placeholder="Enter your title"
            stylelabel="bg-white"
          />
          <TextEditor
            value={editInfo?.description}
            onChange={(e) => {
              editfrom.setValue("description", e);
            }}
          />
          <Button
            disabled={updateLoading}
            variant="primary"
            className="rounded-full w-full"
            size="lg"
          >
            Save changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
