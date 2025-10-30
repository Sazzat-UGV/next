import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib";
import React from "react";

export function VideoCardSkeleton({ className }:any) {
  return (
    <div className={className}>
      <div className="relative">
        <Skeleton className="w-full h-[220px] bg-blacks/10" />
      </div>
      <div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="w-[60px] h-[50px] bg-blacks/10 rounded-full" />
          <ul className="[&>li]:text-blacks w-full space-y-2">
            <Skeleton className="w-full h-[15px] bg-blacks/10 rounded-md" />
            <Skeleton className="w-[80%] h-[15px] bg-blacks/10 rounded-md" />
            <Skeleton className="w-1/2 h-[15px] bg-blacks/10 rounded-md" />
          </ul>
        </div>
      </div>
    </div>
  );
}

// video details
export function PlayerSkeleton() {
  return <Skeleton className="h-[300px] lg:h-[650px] w-full bg-blacks/10"></Skeleton>;
}

export function DetailsSkeleton() {
  return (
    <>
      <PlayerSkeleton />
      {/* Video Title and Actions */}
      <div>
        <Skeleton className="w-[80%] h-4 mt-3 bg-blacks/20" />
        <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full bg-blacks/20" />
            <div className="flex-1">
              <Skeleton className="w-[150px] h-4 rounded-full bg-blacks/20" />
              <Skeleton className="w-[100px] h-3 mt-1 rounded-full bg-blacks/20" />
            </div>
          </div>
          {/* Right actions */}
          <div className="flex mt-2 md:mt-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm has-[>div]:cursor-pointer">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton
                className="w-[60px] h-6 rounded-xl bg-blacks/20"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Channel Info */}
      <div className="border p-4 rounded-md my-5 shadow-xs">
        <Skeleton className="w-[150px] h-4 rounded-full bg-blacks/20" />
        <div className="space-y-2">
          <Skeleton className="w-full h-3 rounded-xl mt-2 bg-blacks/20" />
          <Skeleton className="w-full h-3 rounded-xl mt-2 bg-blacks/20" />
          <Skeleton className="w-full h-3 rounded-xl mt-2 bg-blacks/20" />
          <Skeleton className="w-full h-3 rounded-xl mt-2 bg-blacks/20" />
        </div>
      </div>
    </>
  );
}

export function RelatedVideoCard({ className }: any) {
  return (
    <>
      <div className={cn("flex gap-3 group", className)}>
        <div className="relative w-37 h-22 flex-shrink-0 rounded-md overflow-hidden">
          <Skeleton className="w-full h-full absolute inset-0 bg-blacks/10" />
        </div>
        <div className="flex-1 mt-1 space-y-2">
          <Skeleton className="w-full h-3  bg-blacks/10" />
          <Skeleton className="w-full h-3  bg-blacks/10" />
          <Skeleton className="w-1/2 h-3  bg-blacks/10" />
          <Skeleton className="w-[70%] h-3  bg-blacks/10" />
        </div>
      </div>
    </>
  );
}
