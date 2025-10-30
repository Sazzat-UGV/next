import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_APP_URL as string;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url,
      priority: 1,
    },
    {
      url: url + "/sign-in",
      priority: 2,
    },
    {
      url: url + "/onside-account",
      priority: 3,
    },
    {
      url: url + "/blog",
      priority: 4,
    },
    {
      url: url + "/terms",
      priority: 5,
    },
  ];
}
