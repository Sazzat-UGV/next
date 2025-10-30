import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";
import { Args } from "@/types";

export const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    HomeVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/home-video",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.videos],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
    Categories: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categories],
      transformResponse: (response: any) => {
        return {
          data: response.data.data,
        };
      },
    }),
    VideosDetails: build.query({
      query: (id: string) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sinlgeVideo],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    RelatedVideos: build.query({
      query: ({ id, arg }: Args) => ({
        url: `/get-related-video/${id}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.relatedVideos],
      transformResponse: (response: any) => {
        return buildResponse(response?.data);
      },
    }),
    storeReport: build.mutation({
      query: (data) => ({
        url: "/add-report",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    storeLikeDisLike: build.mutation({
      query: (data) => ({
        url: "/add_like_dislike",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.sinlgeVideo, tagTypes.getlikeVideo],
    }),
    getLinkeVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/like_videos",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.getlikeVideo],
      transformResponse: (response: any) => {
        return buildResponse(response?.data);
      },
    }),
    removeLike: build.mutation({
      query: (id) => ({
        url: `/like_videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.getlikeVideo],
    }),
    channelLandDetails: build.query({
      query: ({ id, arg }: Args) => ({
        url: `/channel-details/${id}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.channelLanDetails],
      transformResponse: (response: any) => {
        const { videos, ...rest } = response?.data;
        const videoAll = buildResponse(videos);
        return {
          ...rest,
          videoAll,
        };
      },
    }),
  }),
});

export const {
  useHomeVideosQuery,
  useCategoriesQuery,
  useRelatedVideosQuery,
  useVideosDetailsQuery,
  useStoreReportMutation,
  useStoreLikeDisLikeMutation,
  useGetLinkeVideosQuery,
  useRemoveLikeMutation,
  useChannelLandDetailsQuery,
} = videosApi;
