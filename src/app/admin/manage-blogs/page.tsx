"use client";
import { Pagination } from "@/components/reuseable/pagination";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { ImgBox } from "@/components/common/admin/reuseable";
import { useGetBlogsQuery } from "@/redux/api/landing/blogApi";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button, Skeleton } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";

export default function ManageBlogs() {
  const [isPage, setIsPage] = useState<number>(1);
  const { data: blogItem, isLoading } = useGetBlogsQuery({ page: isPage });

  return (
    <div>
      <NavTitle
        title="Manage blogs"
        subTitle="You can manage your blogs of your website from here."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <SkeletonCount count={8}>{SkeletonBox()}</SkeletonCount>
        ) : (
          blogItem?.data?.map((item: any) => (
            <Link
              href={`/admin/manage-blogs/${item.id}`}
              key={item.id}
              className="bg-white rounded-lg  h-[170px]  overflow-hidden  duration-200  p-2"
            >
              <div className="flex">
                <div className="">
                  <ImgBox
                    src={item.image}
                    alt={item.title}
                    className="w-40 h-[150px]"
                  />
                </div>
                <div className="flex-1 p-4 relative">
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight className="size-4" />
                  </div>
                  <div className="pr-6">
                    <h3 className="font-semibold text-blacks text-base mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="flex items-center justify-between">
        <Link href="/admin/manage-blogs/add">
          <Button variant="primary" size="lg" className="rounded-full mt-7">
            <Plus className="text-white size-5" />
            Add Blog
          </Button>
        </Link>
        <Pagination
          onPageChange={(v: any) => setIsPage(v)}
          {...blogItem?.meta}
          activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
          itemStyle="rounded-full"
        ></Pagination>
      </div>
    </div>
  );
}

function SkeletonBox() {
  return (
    <div className="border p-2 rounded-lg  flex gap-3">
      <Skeleton className="w-60 h-[150px]" />
      <div className="w-full space-y-2 mt-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <div className="space-y-1 mt-3">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>
    </div>
  );
}
