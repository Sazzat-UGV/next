"use client";
import SectionNav from "@/components/reuseable/section-nav";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Card, Skeleton } from "@/components/ui";
import { useGetTermsQuery } from "@/redux/api/landing/termsApi";
import "react-quill-new/dist/quill.snow.css";

export default function PrivacyPage() {
  const { data: privacy, isLoading } = useGetTermsQuery({ type: "privacy" });

  return (
    <div className="m-auto lg:px-28">
      <SectionNav
        src="/images/privacy.png"
        className="mb-4"
        title="Privacy Policy"
        imgStyles="object-bottom"
        
      />

      <h1 className="font-medium text-lg text-center w-11/12 lg:max-w-5xl mx-auto mb-10">
        Welcome to mytsv.com. By accessing or using our website, you agree to
        comply with and be bound by the following Privacy Policy. Please read
        them carefully before using the site
      </h1>
      <Card>
        {isLoading ? (
          <SkeletonCount count={10}>
            <Skeleton className="w-full h-12" />
          </SkeletonCount>
        ) : (
          <div className="ql-container ql-snow">
            {privacy?.data?.map((item: any) => (
              <div key={item.id} className="space-y-1">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
