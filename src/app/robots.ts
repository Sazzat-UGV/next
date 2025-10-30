import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_APP_URL as string;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/dashboard/",
          "/fqa",
          "/about-us",
          "/history",
          "/like-videos",
        ],
      },
    ],
    sitemap:`${url}/sitemap.xml`,
  };
}
