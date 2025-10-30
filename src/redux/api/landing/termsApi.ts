import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const termsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/page",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.termsAdmin],
    }),
    storeTerms: build.mutation({
      query: (data) => ({
        url: "/admin/page",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.termsAdmin],
    }),
  }),
});

export const { useGetTermsQuery, useStoreTermsMutation } = termsApi;
