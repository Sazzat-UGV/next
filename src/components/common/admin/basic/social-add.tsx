"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { ChevronDownIcon, Plus, X } from "lucide-react";
import { capitalize } from "@/lib/utils";

const socialPlatforms = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <FavIcon name="facebook" className="size-5" />,
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <FavIcon name="instagram" className="size-5" />,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: <FavIcon name="linkdin" className="size-5" />,
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: <FavIcon name="twitterIcon" className="size-4" />,
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: <FavIcon name="youtube" className="size-6" />,
  },
];

export default function SocialMediaLink({ socialLinks, setSocialLinks }: any) {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const addSocialField = () => {
    if (!platform || !url)
      return setError("Please select a platform and enter a URL");
    setSocialLinks((prev: any) => [
      ...prev,
      { id: Date.now().toString(), platform, url },
    ]);
    setError("");
    setPlatform("");
    setUrl("");
  };

  const removeSocialField = (id: string) => {
    setSocialLinks((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {socialLinks.length > 0 &&
        socialLinks.map((item: any, idx: any) => (
          <div key={idx} className="border h-13 rounded-full relative">
            <span className="text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3">
              {capitalize(item.platform)}
            </span>
            <div className="flex items-center gap-3 h-12 my-1">
              {/* Select Platform */}
              <div className="w-16 flex pl-4 items-center space-x-2">
                {socialPlatforms.find((p) => p.value === item.platform)?.icon}
                <ChevronDownIcon className="size-4 text-gray1" />
              </div>

              {/* Input URL */}
              <div className="flex-1 relative">
                <Input
                  placeholder="Paste your link here"
                  value={item.url}
                  onChange={(e) => {
                    const newUrl = e.target.value;
                    setSocialLinks((prev: any) =>
                      prev.map((link: any) =>
                        link.id === item.id ? { ...link, url: newUrl } : link
                      )
                    );
                  }}
                  className="pr-12 h-full border-none"
                />
                <h1 className="w-[2px] h-5 bg-input absolute top-1/2 transform -translate-y-1/2"></h1>

                {/* Remove Button */}
                <div className="right-2 top-1/2 transform -translate-y-1/2 absolute">
                  <Button
                    onClick={() => removeSocialField(item.id)}
                    size="sm"
                    className="bg-reds size-10 relative -top-[3px] hover:bg-reds text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="border h-13 rounded-full relative">
        <span className="text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3">
          Add social media
        </span>
        <div className="flex items-center gap-3 h-12 my-1">
          {/* Select Platform */}
          <div className="w-16">
            <Select value={platform} onValueChange={(v) => setPlatform(v)}>
              <SelectTrigger className="w-full rounded-full py-[22px] border-none cursor-pointer shadow-none">
                {platform
                  ? socialPlatforms.find((p) => p.value === platform)?.icon
                  : "Select"}
              </SelectTrigger>
              <SelectContent className="rounded-md p-0">
                <SelectGroup className="p-0 m-0">
                  {socialPlatforms.map((item, index) => (
                    <SelectItem
                      className="border-b last:border-b-0 py-3 pl-4 rounded-none"
                      key={index}
                      value={item.value}
                    >
                      {item.icon} {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Input URL */}
          <div className="flex-1 relative">
            <Input
              placeholder="Paste your link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pr-12 h-full border-none"
            />
            <h1 className="w-[2px] h-5 bg-input absolute top-1/2 transform -translate-y-1/2"></h1>

            {/* Add Button */}
            <div className="right-2 top-1/2 transform -translate-y-1/2 absolute">
              <Button
                onClick={addSocialField}
                size="sm"
                className="bg-reds size-10 relative -top-[3px] hover:bg-reds text-white rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        {error && <h1 className="text-reds/80 text-sm">{error}</h1>}
      </div>
    </div>
  );
}
