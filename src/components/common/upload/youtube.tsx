import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert, Upload } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import {
  InputSelectField,
  InputSelectFieldIcon,
} from "@/components/reuseable/from-select";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import Icon from "@/icon";
import { useGetCitiesQuery, useGetStatesQuery } from "@/redux/api/commonApi";
import { useStoreVideosMutation } from "@/redux/api/dashboard/videosApi";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import ImgUpload from "@/components/reuseable/img-uplod";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema } from "@/schema";
import { delay, modifyPayloadAll, reasonType } from "@/lib";
import { toast } from "sonner";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import FavIcon from "@/icon/admin/favIcon";
import StripePaymentWrapper from "../stripe";
import Modal from "@/components/reuseable/modal";
import TextEditor from "../admin/reuseable/text-editor";

const intImg = {
  thumbnailPreview: "",
};

export default function YoutubeLink({ type, setIsUpload, price }: any) {
  const [isPayment, setIsPayment] = useState(false);
  const [isColor, setIsColor] = useState(false);
  const [progress, setProgress] = useState<number>();
  const { data: states } = useGetStatesQuery({});
  const [isImg, setIsImg] = useState<any>(intImg);
  const [storeVideos, { isLoading }] = useStoreVideosMutation();
  const { data: categories } = useCategoriesQuery({
    per_page: 1000,
  });
  const [isSelect, setIsSelect] = useState({
    state: [],
    city: [],
  });

  const [isPay, setIsPay] = useState(false);
  const from = useForm({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
      title: "",
      category_id: "",
      city: "",
      states: "",
      visibility: "",
      tags: [],
      description: "",
      thumbnail: null,
    },
  });

  const stateId = from.watch("states");
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
  }, [citys]);

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

  //  handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const { states, ...rest } = values;
    const value = {
      ...rest,
      states: stateName,
      type,
      is_promoted: isColor ? 1 : 0,
    };
    try {
      const data = modifyPayloadAll(value);
      const res = await storeVideos({
        data,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          }
        },
      }).unwrap();
      if (res.status) {
        toast.success("Uploaded Successful", {
          description: "Your video has been uploaded successfully",
        });
        setIsUpload(false);
      }
      await delay();
      from.reset();
      setIsImg(intImg);
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  // handlePaymentSuccess
  const handlePaymentSuccess = () => {
    setIsPayment(false);
    setIsPay(false);
    setIsColor(true);
  };

  return (
    <div>
      <Form
        from={from}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-5">
          <FromInput
            label="Paste your link here"
            name="link"
            placeholder="Enter Your title"
            className="h-10"
          />
          <InputSelectField
            items={isSelect?.state}
            label="State"
            name="states"
            placeholder="Select State"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />

          {/* City Dropdown */}
          <InputSelectField
            items={isSelect?.city}
            label="City"
            name="city"
            placeholder="Select City"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />
          {/* Promoted Button */}
          {isColor ? (
            <Button
              variant="primary"
              type="button"
              className="rounded-full cursor-default text-white font-normal text-base"
            >
              <Icon name="promoted" width={20} />
              <span>{` Promote for ${price || 0} / Month`}</span>
            </Button>
          ) : (
            <div>
              <Button
                variant="primary"
                onClick={() => setIsPay(!isPay)}
                type="button"
                className={`rounded-full ${
                  !isPay && "bg-[#EFEFEF] text-blacks"
                } font-normal text-base`}
              >
                <Icon name="promoted" width={20} />
                <span>{` Promote for ${price || 0} / Month`}</span>
              </Button>
              {!isPay && <span className="text-gray1 ml-3">/ Optional</span>}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Title Input */}
          <FromInput
            label="Title"
            name="title"
            placeholder="Enter Your title"
            className="h-10"
          />

          {/* Category Dropdown */}
          <InputSelectField
            items={categories?.data?.map((item: any) => ({
              label: item?.name,
              value: item?.id?.toString(),
            }))}
            label="Category"
            name="category_id"
            placeholder="Select Category"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />
          {/* Thumbnail Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between border rounded-full p-1 h-9">
              <span className="text-sm pl-1">
                {isImg?.thumbnailPreview
                  ? isImg?.thumbnailPreview
                  : "Thumbnail"}
              </span>
              <ImgUpload
                onFileSelect={(file: File) => {
                  setIsImg({
                    ...isImg,
                    thumbnailPreview: file?.name?.split(".")[0],
                  });
                  from.setValue("thumbnail", file, { shouldValidate: true });
                }}
              >
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center space-x-2 h-7 rounded-full text-[#3B97D3] border-[#3B97D3] hover:text-[#3B97D3]"
                >
                  <Upload className="h-4 w-4 text-[#3B97D3]" />
                  <span>Upload an image</span>
                </Button>
              </ImgUpload>
            </div>
            {from?.formState?.errors?.thumbnail && (
              <p className="text-reds justify-end mt-1 flex items-center gap-1 text-sm">
                {from?.formState?.errors?.thumbnail?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
          </div>

          {/* Visibility Dropdown */}
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
            placeholder="Select Visibility"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-5">
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
          <FromTagInputs
            label="Tags"
            name="tags"
            stylelabel="bg-white"
            className="bg-white min-h-25"
          />
          {/* Description Textarea */}
        </div>
        {isLoading ? (
          <div className="w-full col-span-1 lg:col-span-2">
            <div>
              <div className="bg-[#fff0ee]  h-3 mb-2.5 rounded-full w-full">
                <div
                  className="bg-reds  h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs font-semibold flex justify-end">
              {progress}% Completed
            </div>
          </div>
        ) : (
          <div className="col-span-1 lg:col-span-2 flex justify-end">
            {isPay ? (
              <div className="col-span-1 lg:col-span-2 flex space-x-3 items-center justify-end">
                <h1 className="text-gray-500 flex items-center gap-x-2">
                  <FavIcon name="questionPayment" />
                  After payment you will be returned here immediately.
                </h1>
                <Button type="button" variant="outline">
                  ${price || 0}
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsPayment(true)}
                  variant="primary"
                >
                  Pay now
                </Button>
              </div>
            ) : (
              <Button variant="primary">Publish</Button>
            )}
          </div>
        )}
      </Form>
      {/* isPayment all isPayment, setIsPayment  */}
      <Modal
        title="Pay to MyTSV"
        open={isPayment}
        setIsOpen={setIsPayment}
        titleStyle="text-center"
      >
        {price && (
          <StripePaymentWrapper
            amount={price}
            reason={reasonType.youTube_link}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </Modal>
    </div>
  );
}
