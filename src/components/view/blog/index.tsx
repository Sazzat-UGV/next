"use client";
import React, { useState } from "react";
import { BlogsCard, BlogsSkeleton } from "@/components/reuseable/blog-card";
import SubTilte from "@/components/reuseable/sub-title";
import { useGetBlogsQuery } from "@/redux/api/landing/blogApi";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";

export default function BlogsPage() {
  const [isPage, setIsPage] = useState<number>();
  const query: Record<string, any> = { page: isPage };
  const { data: blogs, isLoading } = useGetBlogsQuery({ ...query });

  return (
    <>
      <SubTilte title="Blogs" />
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {isLoading || !blogs ? (
          <SkeletonCount count={10}>
            <BlogsSkeleton />
          </SkeletonCount>
        ) : (
          blogs.data.map((item: any) => <BlogsCard {...item} key={item.id} />)
        )}
      </div>
      <ul className="flex flex-wrap justify-center my-3">
        <li className="font-medium">
          <Pagination
            onPageChange={(v:any) => setIsPage(v)}
            {...blogs?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
    </>
  );
}
