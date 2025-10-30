import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/notifications",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.notifications],
      transformResponse: (res: any) => {
        const rest = buildResponse(res?.data?.notifications);
        return {
          ...rest,
          unread_notifications_count: res?.data?.unread_notifications_count,
        };
      },
    }),
    markNotification: build.mutation({
      query: (id: string) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.notifications],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkNotificationMutation } =
  notificationsApi;
