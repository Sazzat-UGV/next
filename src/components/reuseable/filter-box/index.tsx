"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/useSideber";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryFiltersProps {
  isCategory: Category;
  setIsCategory: (category: Category) => void;
}

function FilterBox({ isCategory, setIsCategory }: CategoryFiltersProps) {
  const { data: categories, isLoading } = useCategoriesQuery({
    per_page: 1000,
  });
  const { isExpanded } = useSidebar();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 200;
  const [canScroll, setCanScroll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const hasOverflow =
        scrollRef.current.scrollWidth > scrollRef.current.offsetWidth;
      setCanScroll(hasOverflow);
    }
  };
  //   const query: Record<string, any> = { page: isPage, limit: isLimit };
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`w-full ${
        isExpanded ? "md:w-[calc(100vw-325px)]" : "md:w-[calc(100vw-150px)]"
      }`}
    >
      {isLoading ? (
        <div className="h-10 w-full border-y-[1px] border-border/40"></div>
      ) : (
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Left Scroll Button */}
          <Button
            onClick={scrollLeft}
            variant="outline"
            size="icon"
            className="rounded-full bg-white z-10 flex-shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Scrollable category list */}
          <div
            ref={scrollRef}
            className="flex flex-1 gap-2 overflow-x-auto scroll-smooth px-1 min-w-0"
            style={{ scrollbarWidth: "none" }}
          >
            <Button
              onClick={() => setIsCategory({ id: "all", name: "All" })}
              variant="outline"
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium flex-shrink-0",
                isCategory?.id === "all"
                  ? "bg-[#EF4444] text-white hover:bg-[#EF4444] hover:text-white"
                  : "bg-white text-gray-800 border hover:bg-[#EF4444] hover:text-white"
              )}
            >
              All
            </Button>
            {categories?.data?.map(({ id, name }: any) => (
              <Button
                key={id}
                onClick={() => setIsCategory({ id, name })}
                variant="outline"
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium flex-shrink-0",
                  isCategory.id === id
                    ? "bg-[#EF4444] text-white hover:bg-[#EF4444] hover:text-white"
                    : "bg-white text-gray-800 border hover:bg-[#EF4444] hover:text-white"
                )}
              >
                {name}
              </Button>
            ))}
          </div>

          {/* Right Scroll Button */}
          <Button
            onClick={scrollRight}
            variant="outline"
            size="icon"
            className="rounded-full bg-white z-10 flex-shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default FilterBox;
