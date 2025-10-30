"use client";
import ImageUploader from "@/components/common/admin/reuseable/img-upload/img-upload";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { Button } from "@/components/ui";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { delay, modifyPayload } from "@/lib";
import { useStoreBlogsMutation } from "@/redux/api/landing/blogApi";
import { blogSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function AddBlog() {
  const router = useRouter();
  const [storeBlogs, { isLoading }] = useStoreBlogsMutation();
  const from = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = modifyPayload(values);
      const res = await storeBlogs(data).unwrap();
      if (res.status) {
        toast.success("Blog Created Successfully", {
          description: "Your blog has been successfully created and stored",
        });
        await delay();
        router.push(`/admin/manage-blogs`);
        from.reset();
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, from);
    }
  };

  return (
    <div>
      <NavTitle
        title="Add Blogs"
        subTitle="You can manage your blogs of your website from here."
      />
      <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
        <div>
          <div className="space-y-10">
            <div className="w-1/2">
              <ImageUploader
                fileSelect={(file: File) => {
                  from.setValue("image", file);
                }}
                title="Drag and drop your file here"
              />
              {from?.formState?.errors?.image && (
                <p className="text-reds flex mt-2 justify-end items-center gap-1 text-sm">
                  {from?.formState?.errors?.image?.message as string}
                  <CircleAlert size={14} />
                </p>
              )}
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
            </div>
            <Button
              disabled={isLoading}
              variant="primary"
              size="lg"
              className="rounded-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
