import { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image: string;
}

export function Seo({
  title,
  description,
  keywords = [],
  url,
  image,
}: SeoProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string
  const fullUrl = new URL(url, baseUrl)?.toString();
  const fullImageUrl = new URL(image, baseUrl)?.toString();

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: "website",
      siteName: "MyTsv | MyTsv",
    },
    other: {
      facebook: ["website", fullUrl, title, description, fullImageUrl],
      linkedin: [title, description, fullUrl, fullImageUrl],
    },
  };
}
