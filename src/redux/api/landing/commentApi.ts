import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComment: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/comments",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.allcomment],
      transformResponse: (res: any) => {
        const rest = buildResponse(res?.data.comments);
        return {
          ...rest,
          total_comment: res?.data?.total_comment,
        };
      },
    }),
    storeComments: build.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allcomment,tagTypes.sinlgeVideo],
    }),
    commentDelete: build.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allcomment],
    }),
    toggleReaction: build.mutation({
      query: (data) => ({
        url: "/add-remove-comment-reaction",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allcomment],
    }),
    getReplay: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/replies",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.allReplay],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    storeReplay: build.mutation({
      query: (data) => ({
        url: "/replies",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allReplay,tagTypes.sinlgeVideo],
    }),
    toggleReplayReaction: build.mutation({
      query: (data) => ({
        url: "/add-remove-reply-reaction",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allReplay],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useStoreCommentsMutation,
  useToggleReactionMutation,
  useGetReplayQuery,
  useToggleReplayReactionMutation,
  useStoreReplayMutation,
  useCommentDeleteMutation,
} = commentApi;
