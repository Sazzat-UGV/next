import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const usersVideosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userVideos: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/videos",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.userVideos],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    storeVideos: build.mutation({
      query: ({data,onUploadProgress}) => ({
        url: "/videos",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
        onUploadProgress,
      }),
      invalidatesTags: [tagTypes.userVideos],
    }),

    singleDelete: build.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.userVideos],
    }),
    bulkDelete: build.mutation({
      query: (data) => ({
        url: "/videos/bulk-delete",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.userVideos],
    }),
    videoEdit: build.mutation({
      query: ({ data, id }) => ({
        url: `/videos/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.sinlgeVideo, tagTypes.userVideos],
    }),
    VideoAnalytics: build.query({
      query: ({ id, arg }: { id: any; arg?: Record<string, any> }) => ({
        url: `/video-analytics/${id}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
  }),
});

export const {
  useUserVideosQuery,
  useBulkDeleteMutation,
  useSingleDeleteMutation,
  useVideoEditMutation,
  useVideoAnalyticsQuery,
  useStoreVideosMutation,
} = usersVideosApi;
