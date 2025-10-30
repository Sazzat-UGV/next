"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import Img from "@/components/reuseable/img";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePassword from "./change-passwrod";
import { usePathname } from "next/navigation";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import ImgUpload from "@/components/reuseable/img-uplod";
import { modifyPayload } from "@/lib";
import { toast } from "sonner";

const intAva = {
  file: null,
  preview: null,
};

export default function ProfileBox() {
  const pathname = usePathname();
  const [isTab, setIsTab] = useState("edit");
  const { data: profile } = useGetProfileQuery({});
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [avatar, setAvatar] = useState<any>(intAva);

  const from = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (profile) {
      from.reset({
        name: profile?.data?.name,
        email: profile?.data?.email,
      });
    }
  }, [profile, from]);

  const handleSubmit = async (values: any) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { image: avatar?.file }),
    };
    const data = modifyPayload(value);
    const res = await updateProfile(data).unwrap();
    if (res?.status) {
      toast.success("Profile Updated", {
        description: "Your profile has been updated successfully",
      });
      setAvatar(intAva);
    }
  };

  //  tab control
  useEffect(() => {
    setIsTab(
      pathname.includes(`/admin/setting/change-password`) ? "change" : "edit"
    );
  }, [pathname]);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-md py-4 text-center mx-auto">
          <div className="relative inline-block mb-2">
            <Img
              src={avatar?.preview || profile?.data?.avatar || "/blur.png"}
              title="Profile picture"
              className="size-30 rounded-full"
            />
            {isTab == "edit" && (
              <ImgUpload
                className="bg-white grid place-items-center shadow-md size-8 rounded-full absolute bottom-1 right-1 cursor-pointer"
                onFileSelect={(file: File) => {
                  setAvatar({
                    ...avatar,
                    file,
                    preview: URL.createObjectURL(file),
                  });
                }}
              >
                <SquarePen size={18} className="text-gray1" />
              </ImgUpload>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-blacks mb-1">
            {profile?.data?.name}
          </h1>
          <p className="text-gray1 mb-4">{profile?.data?.email}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 text-sm py-3">
          <button
            onClick={() => setIsTab("edit")}
            className={`text-[#043249] ${
              isTab === "edit" && "!border-b-2 !border-[#043249]/90"
            } px-4 border-b-2 border-transparent font-semibold text-base cursor-pointer`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setIsTab("change")}
            className={`text-[#043249] ${
              isTab === "change" && "!border-b-2 !border-[#043249]/90"
            } px-4 border-b-2 border-transparent font-semibold text-base cursor-pointer`}
          >
            Change Password
          </button>
        </div>

        {/* Forms */}
        {isTab === "edit" ? (
          <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
            <FromInput
              className="bg-white border-none rounded-md"
              label="Name"
              name="name"
              placeholder="Enter your name"
              matching={true}
            />
            <FromInput
              className="bg-white border-none rounded-md"
              label="Email"
              name="email"
              placeholder="Enter your email"
              matching={true}
              readOnly={true}
            />
            <div className="flex justify-center">
              <Button disabled={isLoading} variant={"primary"} className="px-8">
                Save
              </Button>
            </div>
          </Form>
        ) : (
          <ChangePassword />
        )}
      </div>
    </div>
  );
}
