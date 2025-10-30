"use client";
import ResponsivePagination from "react-responsive-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export function Pagination({
  current_page = 1,
  onPageChange,
  total = 10,
  per_page,
  className,
  activeStyle,
  itemStyle,
}: any) {
  const totalCount = Math.ceil(total / per_page);

  if (total <= per_page) return null;

  return (
    <div className={cn("lg:w-[320px] flex justify-end", className)}>
      <ResponsivePagination
        previousLabel={<ChevronLeft className="h-4 w-4" />}
        nextLabel={<ChevronRight className="h-4 w-4" />}
        className="flex flex-row gap-1 w-fit"
        pageItemClassName={cn(
          "h-10 border rounded-md w-10 flex items-center justify-center whitespace-nowrap text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          itemStyle
        )}
        pageLinkClassName="h-10 w-10 flex items-center justify-center rounded-full"
        activeItemClassName={cn(
          `bg-transparent border border-[#1890FF] text-[#1890FF] hover:bg-transparent hover:!text-[#1890FF] rounded-md`,
          activeStyle
        )}
        disabledItemClassName="hover:!bg-transparent"
        current={current_page}
        total={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}
