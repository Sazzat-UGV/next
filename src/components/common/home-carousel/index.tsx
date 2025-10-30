"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetBannerQuery } from "@/redux/api/admin/promotionalApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui";


export default function HomeCarousel() {
  const { data: banners, isLoading } = useGetBannerQuery({});
  const [api, setApi] = useState<any | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  // const { isMobile } = useIsMobile();
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.scrollTo({ top: isMobile ? 350 : 400, behavior: "smooth" });
  //   }
  // }, [isMobile]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToPrevious = () => {
    if (!api) return;
    const prevIndex = current === 0 ? count - 1 : current - 1;
    setCurrent(prevIndex);
    api.scrollTo(prevIndex);
  };

  const goToNext = () => {
    if (!api) return;
    const nextIndex = current === count - 1 ? 0 : current + 1;
    setCurrent(nextIndex);
    api.scrollTo(nextIndex);
  };


  return (
    banners?.is_banner_active ? (
      <div className="my-7">
        {isLoading ? (
          <Skeleton className="w-full h-[230px] md:h-[350px] xl:h-[400px]" />
        ) : (
          <div className="w-full mx-auto relative">
            <Carousel
              setApi={setApi}
              className="overflow-hidden"
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
                Fade(),
              ]}
            >
              <CarouselContent>
                {banners?.data?.map((item: any, index: any) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full rounded-md h-[230px] md:h-[350px] xl:h-[400px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`banner ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)",
                        }}
                      ></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Dots */}
            <div className="flex lg:hidden justify-center bottom-5 absolute left-1/2 -translate-x-1/2 gap-2">
              {Array.from({ length: banners?.data?.length }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full z-10 cursor-pointer transition-all duration-300 ${current === index + 1 ? "w-6 bg-red-500" : "w-2 bg-gray-300"
                    }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Navigation Buttons */}
            <span className="hidden lg:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-white/80 hover:bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </Button>
            </span>
            <span className="hidden lg:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute grid place-items-center right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </Button>
            </span>
          </div>
        )}
      </div>
    ) : ("")

  );
}
