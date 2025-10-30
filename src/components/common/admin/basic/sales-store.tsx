"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FromField } from "../reuseable/form-field";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import ImageUploader from "../reuseable/img-upload/img-upload";
import { salesSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useStoreSalesRepresenMutation } from "@/redux/api/admin/salesresApi";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { delay, modifyPayload } from "@/lib";
import { toast } from "sonner";

export default function SalesStore({ setIsStore }: any) {
  const [storeSalesRepresen, { isLoading }] = useStoreSalesRepresenMutation();
  
  const from = useForm({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      photo: null,
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = modifyPayload(values);
      const res = await storeSalesRepresen(data).unwrap();
      if (res.status) {
        toast.success("Store Successful", {
          description: "Sales representative created successfully",
        });
        await delay()
        setIsStore(false);
      }
      from.reset();
    } catch (err: any) {
      ResponseApiErrors(err.data, from);
    }
  };

  return (
    <div>
      <Form className="space-y-4 pt-4" from={from} onSubmit={handleSubmit}>
        <div>
          <ImageUploader
            title="Drag and drop representative photo here"
            fileSelect={(file) => from.setValue("photo", file)}
          />
          {from?.formState?.errors?.photo && (
            <p className="text-reds flex justify-end items-center gap-1 text-sm">
              {from?.formState?.errors?.photo?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>
        <FromField
          name="name"
          placeholder="Enter representative name "
          className="h-11 rounded-2xl"
          icon={
            <FavIcon name="representative" color="#888888" className="size-4" />
          }
        />
        <FromField
          name="phone"
          placeholder="Phone number"
          type="number"
          className="h-11 rounded-2xl"
          icon={<FavIcon name="phone" color="#888888" className="size-4" />}
        />
        <FromField
          name="email"
          placeholder="Email address"
          className="h-11 rounded-2xl"
          type="email"
          icon={<FavIcon name="mail" color="#888888" className="size-4" />}
        />
        <FromField
          name="location"
          placeholder="Location Hare"
          className="h-11 rounded-2xl"
          icon={<FavIcon name="location" color="#888888" className="size-4" />}
        />

        <Button
          type="submit"
          variant={"primary"}
          className="w-full rounded-full"
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
