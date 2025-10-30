import { ImgBox } from "@/components/common/admin/reuseable";
import Img from "@/components/reuseable/img";
import SectionNav from "@/components/reuseable/section-nav";
import { Card } from "@/components/ui/card";
import { authKey } from "@/lib";
import { Seo } from "@/lib/seo";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = Seo({
  title: "About Us | MyTsv",
  description:
    "At MyTSV, we believe that powerful ideas deserve a platform. Whether you're an individual looking to share your voice, a business seeking exposure, or a curious mind in search of new opportunities, we provide the digital space and tools to help you thrive",
  keywords: [
    "MyTsv Terms",
    "MyTsv Conditions",
    "MyTsv policy",
    "MyTsv legal",
    "terms and conditions MyTsv",
  ],
  url: `/about-us`,
  image: "/images/about-img.svg",
});

export default async function AboutUs() {
  const tokon = (await cookies()).get(authKey)?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about-us`, {
    headers: { Authorization: `Bearer ${tokon}` },
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  const { data } = await res.json();
  if (!data || !Array.isArray(data)) return null;

  // group items
  const firstGroup = data.slice(0, 2);
  const secondGroup = data.slice(2, 4);
  const lastItem = data[4];

  // reusable renderer
  const renderCard = (item: any) => (
    <Card key={item.id} className="gap-3">
      <div className="flex items-center gap-x-5">
        <ImgBox
          src={item.icon}
          className="size-16 rounded-full"
          alt={item.title}
        ></ImgBox>

        <h3 className="text-2xl font-semibold text-blacks">{item.title}</h3>
      </div>
      <div
        className="space-y-2"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    </Card>
  );

  return (
    <div className="m-auto lg:px-20">
      <SectionNav
        src="/images/about-img.svg"
        title="About Us"
        className="mb-5"
        imgStyle="w-80 h-[186px]"
        titleStyle="px-1 max-w-md"
      />

      {/* Top Section */}
      <div className="text-center space-y-4 mb-6">
        <h2 className="text-lg md:text-2xl font-semibold text-blacks">
          Welcome to mytsv.com your destination for connection, creativity, and
          community
        </h2>
        <p className="text-blacks text-base xl:px-20">
          At MyTSV, we believe that powerful ideas deserve a platform. Whether
          you&apos;re an individual looking to share your voice, a business
          seeking exposure, or a curious mind in search of new opportunities, we
          provide the digital space and tools to help you thrive.
        </p>
      </div>

      {/* Dynamic Groups */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* first group (left side) */}
          <div className="col-span-1 lg:col-span-2 space-y-2">
            {firstGroup.map(renderCard)}
          </div>

          {/* second group (right side) */}
          <div className="col-span-1 lg:col-span-3 space-y-2">
            {secondGroup.map(renderCard, "h-1/2")}
          </div>
        </div>

        {/* Last Item */}
        {lastItem && (
          <Card key={lastItem.id} className="gap-3 mt-3">
            <div className="flex items-center justify-center gap-x-5">
              <Img
                src={lastItem.icon}
                className="size-16"
                imgStyle="object-left-top object-fill"
                title={lastItem.title}
              />
              <h3 className="text-2xl font-semibold text-blacks">
                {lastItem.title}
              </h3>
            </div>
            <div
              className="space-y-2"
              dangerouslySetInnerHTML={{ __html: lastItem.description }}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
