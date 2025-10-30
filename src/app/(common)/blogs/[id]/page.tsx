import { BackBtn } from "@/components/reuseable/icon-list";
import Link from "next/link";
import { IdParams } from "@/types";
import { makeStore } from "@/redux/store";
import { blogApi } from "@/redux/api/landing/blogApi";
import { ImgBox } from "@/components/common/admin/reuseable";
import SafeHTML from "@/components/reuseable/safe-html";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: IdParams): Promise<Metadata> {
  const { id } = await params;
  const store = makeStore();
  const { data } = await store.dispatch(
    blogApi.endpoints.singleBlog.initiate(id)
  );
  const { image, title } = data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/blog/${id}`;
  const description = title;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 800, height: 600, alt: title }],
      type: "website",
      siteName: "MY TSV",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
  };
}

export default async function Blog({ params }: IdParams) {
  const { id } = await params;
  const store = makeStore();
  const { data } = await store.dispatch(
    blogApi.endpoints.singleBlog.initiate(id)
  );
  const { image, title, description } = data || {};

  return (
    <div>
      <Link href={"/blogs"}>
        {" "}
        <BackBtn className="pb-2 mb-2" />
      </Link>
      <div className="w-full">
        <ImgBox
          src={image}
          className="w-full xl:w-[600px] h-[400px] 2xl:w-[800px] 2xl:h-[450px] float-left mb-4 xl:mb-[6px] mr-5"
          alt={title}
        />
        <h1 className="text-xl lg:text-2xl font-bold leading-tight pb-3">
          {title}
        </h1>
        <SafeHTML html={description} />
        {/* <div dangerouslySetInnerHTML={{ __html:htmlContent}} /> */}
      </div>
    </div>
  );
}
