"use client";
import SocialMediaLink from "@/components/common/admin/basic/social-add";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import { Button } from "@/components/ui";
import { useGetSeoQuery, useUpdateSeoMutation } from "@/redux/api/admin/seoApi";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

interface SocialMediaLinkType {
  id: string;
  platform: string;
  url: string;
}

export default function Seo() {
  const { data } = useGetSeoQuery({});
  const [updateSeo, { isLoading: updateLoading }] = useUpdateSeoMutation();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinkType[]>([]);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      ...values,
      links: socialLinks.reduce((acc, item) => {
        const existing = acc.find((link) => link.key === item.platform);
        if (existing) {
          existing.value.push(item.url);
        } else {
          acc.push({
            key: item.platform,
            value: [item.url],
          });
        }
        return acc;
      }, [] as { key: string; value: string[] }[]),
    };

    // api call all ok
    const res = await updateSeo(value).unwrap();
    if (res.status) {
      toast.success("Your SEO updates have been saved", {
        description:
          "The changes may take up to 72 hours to appear on MyTSV",
      });
    }
  };

  // Reset form + socialLinks when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        tags: data?.tags,
      });

      // ✅ Transform "links" JSON into [{id, platform, url}, ...]
      if (data.links && Array.isArray(data.links)) {
        const transformedLinks = data.links.flatMap((link: any) =>
          link.value.map((url: string, idx: number) => ({
            id: `${link.key}-${idx}`,
            platform: link.key,
            url,
          }))
        );
        setSocialLinks(transformedLinks);
      }
    }
  }, [data, form]);

  return (
    <div>
      <NavTitle
        title="SEO Management"
        subTitle="You can manage your seo of your website from here"
      />
      <Form from={form} onSubmit={handleSubmit}>
        <div className="space-y-8 max-w-6xl mx-auto py-10">
          <FromInputs
            label="Title"
            name="title"
            placeholder="Enter your title"
          />
          <FromTextAreas
            label="Description"
            name="description"
            placeholder="Enter your Description"
            className="min-h-44 rounded-3xl"
          />
          <FromTagInputs label="Tags" name="tags" />

          {/* ✅ Pass default socialLinks */}
          <SocialMediaLink
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />

          <Button
            variant="primary"
            size="lg"
            className="rounded-full float-end"
            disabled={updateLoading}
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}
