"use client";
import NavItem from "@/components/common/dashboard/navber";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import FromLocation from "@/components/reuseable/from-location";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { useEditProfileMutation } from "@/redux/api/dashboard/simpleApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { FieldValues, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import FavIcon from "@/icon/admin/favIcon";
import Icon from "@/icon";
import Image from "next/image";
import { modifyPayloadAll } from "@/lib";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import avaterImg from "@/assets/avaterImg.svg";
import { toast } from "sonner";

const intImg = {
  coverPreview: "",
  avatarPreview: "",
  cover_image: null,
  avatar: null,
};

export default function Settings() {
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const { data } = useGetProfileQuery({});
  const [isImg, setIsImg] = useState<any>(intImg);
  const from = useForm({
    defaultValues: {
      channel_name: "",
      email: "",
      services: [],
      name: "",
      contact: "",
      bio: "",
      locations: [],
    },
  });

  const {
    channel_name,
    name,
    email,
    contact,
    bio,
    services,
    cover_image,
    avatar,
    locations,
  } = data?.data || {};

  useEffect(() => {
    if (data?.data) {
      from.reset({
        channel_name: channel_name || "",
        name: name || "",
        email: email || "",
        contact: contact || "",
        locations: locations || [],
        bio: bio || "",
        services: services || [],
      });
    }
  }, [
    data?.data,
    from,
    channel_name,
    name,
    email,
    contact,
    bio,
    services,
    cover_image,
    avatar,
    locations,
  ]);

  const handleSubmit = async (values: FieldValues) => {
    const valueItem = {
      ...values,
      ...(isImg.cover_image ? { cover_image: isImg.cover_image } : {}),
      ...(isImg.avatar ? { image: isImg.avatar } : {}),
    };
    try {
      const data = modifyPayloadAll(valueItem);
      const res = await editProfile(data).unwrap();
      if (res.status) {
        toast.success("Profile updated successfully", {
          description: "Your profile information has been updated",
        });
        setIsImg(intImg);
        from.reset();
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        ResponseApiErrors(err.data, from);
      }
    }
  };

  return (
    <div>
      <NavItem title="Settings" search={false} />
      <div className="mt-10">
        <div className="relative h-48 md:h-64">
          <Image
            src={isImg.coverPreview || cover_image || "/blur.png"}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute bottom-0 left-15 translate-y-1/2 ">
            <div className="relative">
              <Avatar className="size-24  shadow-md">
                <AvatarImage
                  src={isImg.avatarPreview || avatar}
                  alt="Profile picture"
                />
                <AvatarFallback className="text-2xl font-bold">
                  {channel_name?.toUpperCase()?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <ImgUpload
                onFileSelect={(file: File) => {
                  setIsImg({
                    ...isImg,
                    avatar: file,
                    avatarPreview: URL.createObjectURL(file),
                  });
                }}
              >
                <div className="size-9 absolute cursor-pointer grid place-items-center rounded-full bottom-0 right-0">
                  <Image src={avaterImg} alt={"avaterimg"} fill />
                </div>
              </ImgUpload>
            </div>
          </div>
          <ImgUpload
            onFileSelect={(file: File) => {
              setIsImg({
                ...isImg,
                cover_image: file,
                coverPreview: URL.createObjectURL(file),
              });
            }}
          >
            <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-3 right-3 backdrop-blur-3xl bg-black/50">
              <FavIcon className="size-4" name="editprofile" />
            </div>
          </ImgUpload>
        </div>
      </div>
      <Form className="mt-20" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 [&>div]:space-y-6">
          <div>
            <FromInputs
              label="Channel name"
              name="channel_name"
              placeholder="Enter your Channel name"
            />
            <FromInputs
              label="Email"
              name="email"
              placeholder="Enter your Email"
              readOnly={true}
            />
            <FromTagInputs
              label="Services"
              name="services"
              placeholder="Enter your Services"
            />
            <FromLocation label="Business locations" name="locations" />
          </div>
          <div>
            <FromInputs
              label="Your full name"
              name="name"
              placeholder="Enter your Full name"
            />
            <FromInputs
              type="number"
              label="Contact"
              name="contact"
              placeholder="Enter your Contact"
            />
            <FromTextAreas
              label="Bio"
              name="bio"
              placeholder="Enter your Bio"
              className="min-h-44 rounded-3xl"
            />
            <div className="flex justify-end">
              <Button
                disabled={isLoading}
                variant={"primary"}
                size={"lg"}
                className="rounded-full text-base"
              >
                <Icon name="saveWhite" width={16} />
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
