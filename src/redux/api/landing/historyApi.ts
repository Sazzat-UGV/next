import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const historyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    watchHistory: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/watch-history",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    toggleHistory: build.mutation({
      query: (data) => ({
        url: "/pause-play-watch-history",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    storeHistory: build.mutation({
      query: (data) => ({
        url: "/watch-history",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.sinlgeVideo],
    }),
    removeHistory: build.mutation({
      query: (id) => ({
        url: `/watch-history/${id}`,
        method: "DELETE",
      }),
    }),
    bulkDeleteHistory: build.mutation({
      query: () => ({
        url: `/bulk-delete-watch-history`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useWatchHistoryQuery,
  useToggleHistoryMutation,
  useStoreHistoryMutation,
  useRemoveHistoryMutation,
  useBulkDeleteHistoryMutation,
} = historyApi;
