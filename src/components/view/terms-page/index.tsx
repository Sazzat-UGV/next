"use client";
import SectionNav from "@/components/reuseable/section-nav";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Card, Skeleton } from "@/components/ui";
import { useGetTermsQuery } from "@/redux/api/landing/termsApi";
import "react-quill-new/dist/quill.snow.css";

export default function TermsPage() {
  const { data: terms, isLoading } = useGetTermsQuery({ type: "Terms" });

  return (
    <div className="m-auto lg:px-28">
      <SectionNav
        src="/images/tarams.svg"
        className="mb-4"
        title="Terms & Conditions"
      />

      <h1 className="font-medium text-lg text-center w-11/12 lg:max-w-5xl mx-auto mb-10">
        Welcome to mytsv.com. By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions. Please
        read them carefully before using the site
      </h1>
      <Card>
        {isLoading ? (
          <SkeletonCount count={10}>
            <Skeleton className="w-full h-12" />
          </SkeletonCount>
        ) : (
          <div className="ql-container ql-snow">
            {terms?.data?.map((term: any) => (
              <div key={term.id} className="space-y-1">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: term.text }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
