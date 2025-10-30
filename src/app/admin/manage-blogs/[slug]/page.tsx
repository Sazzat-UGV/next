"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import FavIcon from "@/icon/admin/favIcon";
import { delay, modifyPayload } from "@/lib";
import {
  useDeleteBlogMutation,
  useSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/landing/blogApi";
import { CircleAlert } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddBlog() {
  const { confirm } = useConfirmation();
  const [imgPreview, setImgPreview] = useState("");
  const { slug } = useParams();
  const ids = slug as string;
  const { data } = useSingleBlogQuery(ids);

  const router = useRouter();
  const [updateBlogs, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  // Corrected type for the form
  const from = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null as File | null,
    },
  });

  const { id, title, description, image } = data || {};

  useEffect(() => {
    if (data) {
      from.reset({
        title,
        description,
      });
    }
  }, [data, from, id, title, description, image]);

  const handleSubmit = async (values: FieldValues) => {
    const { image, ...rest } = values;
    const value = {
      ...rest,
      _method: "PUT",
      ...(image && { image: image }),
    };
    try {
      const data = modifyPayload(value);
      const res = await updateBlogs({ id, data }).unwrap();
      if (res.status) {
        toast.success("Blog Updated Successfully", {
          description: "Your blog has been successfully updated and stored",
        });
        await delay();
        router.push(`/admin/manage-blogs`);
        from.reset();
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, from);
    }
  };
  // handleDeleteBlog
  const handleDeleteBlog = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const con = await confirm({
      title: "Are you sure you want to delete this blog?",
      description: "Once deleted, you won't be able to recover this blog.",
    });
    if (con) {
      const res = await deleteBlog(id).unwrap();
      if (res.status) {
        await delay();
        router.push(`/admin/manage-blogs`);
        from.reset();

      }
    }
  };

  return (
    <div>
      <NavTitle
        title="Blog details"
        subTitle="You can manage your blogs of your website from here."
      />
      <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
        <div>
          <div className="space-y-10">
            <div className="flex justify-between">
              <div className="w-1/2 h-[200px]">
                <ImgBox
                  src={imgPreview || image || "/blog.png"}
                  alt="img"
                  className="w-full h-full"
                >
                  <ImgUpload
                    onFileSelect={(file: File) => {
                      from.setValue("image", file); // Correctly sets the file
                      setImgPreview(URL.createObjectURL(file));
                    }}
                    className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-2 right-2 backdrop-blur-3xl bg-black/50"
                  >
                    <FavIcon className="size-4" name="editprofile" />
                  </ImgUpload>
                </ImgBox>
              </div>
              <button
                type="button"
                onClick={(event: any) => handleDeleteBlog(id, event)}
                disabled={isLoading}
                className="size-[37px] grid place-items-center text-[#FF5353] bg-[#FFE8E8] rounded-lg cursor-pointer"
              >
                <FavIcon name="delete" />
              </button>
            </div>

            <FromInputs
              label="Title"
              name="title"
              placeholder="Enter your title"
            />
            <div>
              <TextEditor
                value={from.watch("description")}
                onChange={(v) => from.setValue("description", v)}
                className="bg-body !min-h-[400px]"
              />
              {from?.formState?.errors?.description && (
                <p className="text-reds flex mt-2 justify-end items-center gap-1 text-sm">
                  {from?.formState?.errors?.description?.message as string}
                  <CircleAlert size={14} />
                </p>
              )}
                 <Button
              disabled={isUpdating}
              variant="primary"
              size="lg"
              className="rounded-full mt-5"
            >
              Save Changes
            </Button>
            </div>
         
          </div>
        </div>
      </Form>
    </div>
  );
}
