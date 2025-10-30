"use client";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionNav from "@/components/reuseable/section-nav";
import { useGetFaqsQuery } from "@/redux/api/landing/fqaApi";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Skeleton } from "@/components/ui/skeleton";



export default function FqaBox() {
  const { data: fqaItem, isLoading } = useGetFaqsQuery({});
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-6xl m-auto">
      <SectionNav
        src="/images/question-img.svg"
        title="Frequently Asked Questions (FAQ)"
      />

      {isLoading ? (
        <div className="space-y-3">
          <SkeletonCount count={7}>
            <Skeleton className="w-full block h-13 bg-black/20" />
          </SkeletonCount>
        </div>
      ) : (
        <div ref={containerRef}>
          <div className="flex flex-col  justify-center lg:flex-row">
            <div>
              {fqaItem?.data?.map((item: any, index: any) => (
                <div key={index} className="flex">
                  <div className="py-3 px-5 mb-4 bg-white rounded-xl cursor-pointer w-full">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h4 className="text-base font-medium text-blacks">
                        {item.question}
                      </h4>
                      <span>
                        {activeAccordion === index ? (
                          <ChevronUp
                            size={27}
                            className="text-blacks rounded-full p-1"
                          />
                        ) : (
                          <ChevronDown
                            size={27}
                            className="text-blacks rounded-full p-1"
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        activeAccordion === index ? "max-h-full" : "max-h-0"
                      }`}
                      style={{
                        maxHeight: activeAccordion === index ? "500px" : "0px",
                      }}
                    >
                      <p className="text-sm lg:text-base mt-1">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
