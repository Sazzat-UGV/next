"use client";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import React, { useState } from "react";
import FavIcon from "@/icon/admin/favIcon";
import {
  useGetNotificationsQuery,
  useMarkNotificationMutation,
} from "@/redux/api/admin/notificationsApi";
import { formatDate, formatTime } from "@/lib";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { Skeleton } from "@/components/ui";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Pagination } from "@/components/reuseable/pagination";
import { useRouter } from "next/navigation";

// Define the possible keys for the notification type
type NotificationType = "user_registration" | "new_video" | "new_report";

// Define the colors for each notification type using Record
const isColor: Record<NotificationType, string> = {
  user_registration: "#0063E5",
  new_video: "#FF9E02",
  new_report: "#FF3F3F",
};

export default function Notification() {
  const router = useRouter();
  const [isPage, setIsPage] = useState<number>(1);
  const { data: notification, isLoading } = useGetNotificationsQuery({
    page: isPage,
  });
  const [markNotification] = useMarkNotificationMutation();

  const handleView = async (id: string, order: boolean) => {
    if (!order) {
      await markNotification(id).unwrap();
    }
    router.push(`/admin/reports/${id}`);
  };

  return (
    <div>
      <NavTitle
        title="Notifications"
        subTitle="You can manage the notifications of MyTSV from here."
      />
      <div className="space-y-8 py-5">
        {isLoading ? (
          <SkeletonCount count={10}>
            <Skeleton className="h-16 w-full" />
          </SkeletonCount>
        ) : notification?.data?.length > 0 ? (
          notification?.data?.map((noti: any) => {
            const type = noti?.data?.type as NotificationType;
            const borderColor = isColor[type];
            const show = noti?.read_at == null ? true : false;
            return (
              <div
                key={noti.id}
                style={{
                  borderColor: borderColor,
                }}
                className={`bg-white border-l-4  p-3 grid grid-cols-1 lg:grid-cols-3 rounded-md`}
              >
                <div className="mb-2 md:mb-0">
                  <h3 className="lg:text-base xl:text-xl font-semibold text-blacks">
                    {noti?.data?.title}
                  </h3>
                  <p className="text-sm text-blacks">
                    {noti?.data?.sub_title}{" "}
                    {noti?.data?.type === "new_report" && (
                      <span
                        onClick={() => handleView(noti?.data?.report_id, show)}
                        className="text-gray1 cursor-pointer"
                      >
                        Tap to view
                      </span>
                    )}
                  </p>
                </div>
                <ul className="md:left-1/2 relative space-y-2 *:text-gray1">
                  <li className="flex items-center gap-1">
                    <FavIcon name="calender" className="size-4" />
                    <span className="text-sm">
                      {formatDate(noti.data?.created_at)}
                    </span>
                  </li>
                  <li className="flex items-center gap-1">
                    <FavIcon name="time" className="size-4" />
                    <span className="text-sm">
                      {formatTime(noti.data?.created_at)}
                    </span>
                  </li>
                </ul>
                <div className="text-gray-500 items-center hidden md:flex md:justify-end">
                  {show ? (
                    <FavIcon name="noti" className="size-4" />
                  ) : (
                    <FavIcon name="isRead" className="size-4" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NoItemData time="this report not available" />
        )}
        <ul className="flex flex-wrap justify-end my-7">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => setIsPage(v)}
              {...notification?.meta}
              activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
              itemStyle="rounded-full"
            ></Pagination>
          </li>
        </ul>
      </div>
    </div>
  );
}
