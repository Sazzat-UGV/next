import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";
import { Args } from "@/types";

export const channelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getChannels: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/get-channels",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.getChannels],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    getChannelsDetails: build.query({
      query: ({ id, arg }: Args) => ({
        url: `/channel-details/${id}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.channelDetailsAdmin],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    channelDelete: build.mutation({
      query: (id) => ({
        url: `/admin/delete-channel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.getChannels],
    }),
    reportAction: build.mutation({
      query: ({ id, data }: any) => ({
        url: `/admin/take-report-action/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useChannelDeleteMutation,
  useGetChannelsDetailsQuery,
  useReportActionMutation
} = channelApi;
