"use client";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import { Button } from "@/components/ui";
import { modifyPayload } from "@/lib";
import {
  useGetTermsQuery,
  useStoreTermsMutation,
} from "@/redux/api/landing/termsApi";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Terms() {
  const { data: terms, isLoading: termsLoading } = useGetTermsQuery({
    type: "privacy",
  });
  const [storeTerms, { isLoading }] = useStoreTermsMutation();

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (terms?.data?.[0]?.type === "privacy") {
      setContent(terms.data[0].text);
    }
  }, [terms]);

  const handleSave = async () => {
    try {
      const value = {
        type: "privacy",
        text: content,
      };
      const data = modifyPayload(value);
      const res = await storeTerms(data).unwrap();

      if (res.status) {
        toast.success("Update Successful", {
          description: "Privacy Policy have been updated",
        });
      }
    } catch (error) {
      toast.error("Update Failed", {
        description: "Failed to update Privacy Policy",
      });
    }
  };

  return (
    <div>
      <NavTitle
        title="Privacy Policy"
        subTitle="You can manage the Privacy Policy section of MyTSV from here."
      />
      {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor key="privacy" value={content} onChange={setContent} />
      )}

      <div className="mt-3 flex justify-end">
        <Button
          onClick={handleSave}
          variant={"primary"}
          className={"rounded-sm px-20"}
          disabled={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
