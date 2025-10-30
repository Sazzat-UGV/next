"use client";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { Button, Input, Label, Skeleton } from "@/components/ui";
import { modifyPayload } from "@/lib";
import {
  useGetPriceQuery,
  useStorePriceMutation,
} from "@/redux/api/admin/pricingApi";
import React, { useEffect, useState } from "react";

interface PriceItemProps {
  id: string;
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Pricings() {
  const { data, isLoading } = useGetPriceQuery({});
  const [storePrice, { isLoading: priceLoading }] = useStorePriceMutation();
  const [prices, setPrices] = useState({
    uploading_video: "",
    uploading_youTube_link: "",
    onsite_account_creation: "",
  });

  useEffect(() => {
    if (data) {
      setPrices({
        uploading_video: data?.uploading_video,
        uploading_youTube_link: data?.uploading_youTube_link,
        onsite_account_creation: data?.onsite_account_creation,
      });
    }
  }, [data]);

  const handlePriceChange = (service: string, value: string) => {
    setPrices((prev) => ({
      ...prev,
      [service]: value,
    }));
  };

  const handleUpdate = async () => {
    const data = modifyPayload(prices);
    await storePrice(data).unwrap();
  };

  return (
    <div>
      <NavTitle
        title="Pricings"
        subTitle="You can see & manage all the pricings of MyTSV from here."
      />
      <div className="max-w-7xl mx-auto space-y-4 mt-10">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-11 w-full rounded-full" />
            <Skeleton className="h-11 w-full rounded-full" />
            <Skeleton className="h-11 w-full rounded-full" />
            <Skeleton className="h-11 mx-auto w-[200px] rounded-full" />
          </div>
        ) : (
          <>
            <PriceItem
              id="uploading-video"
              label="Uploading video"
              value={prices.uploading_video}
              onChange={(val) => handlePriceChange("uploading_video", val)}
            />
            <PriceItem
              id="uploading-youtube"
              label="Uploading YouTube Link"
              value={prices.uploading_youTube_link}
              onChange={(val) =>
                handlePriceChange("uploading_youTube_link", val)
              }
            />
            <PriceItem
              id="onsite-account"
              label="Onsite account creation"
              value={prices.onsite_account_creation}
              onChange={(val) =>
                handlePriceChange("onsite_account_creation", val)
              }
            />

            {/* Update Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleUpdate}
                variant="primary"
                className="rounded-full h-11 px-30 text-base"
                disabled={priceLoading}
              >
                Update
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// PriceItem
const PriceItem = ({
  id,
  label,
  unit = "/Video",
  value,
  onChange,
}: PriceItemProps) => {
  const [inputWidth, setInputWidth] = useState("2ch");
  useEffect(() => {
    setInputWidth(`${Math.max((value?.length || 2) + 1, 4)}ch`);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setInputWidth(`${Math.max(newValue?.length + 1, 4)}ch`);
  };
  return (
    <div className="bg-white rounded-full py-3 px-6 flex items-center justify-between *:text-lg border">
      <Label
        htmlFor={id}
        className="font-medium cursor-default select-text text-blacks"
      >
        {label}
      </Label>
      <div className="flex items-center">
        <span className="font-medium text-blacks">$</span>
        <Input
          id={id}
          type="number"
          step="0.01"
          value={value}
          onChange={handleChange}
          style={{ width: inputWidth }}
          className="border-none  p-0  h-4 !text-lg rounded-none font-medium text-blacks focus-visible:ring-0 text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-sm text-[#888] font-medium relative mt-2">
          {unit}
        </span>
      </div>
    </div>
  );
};
