import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeo: build.query({
      query: () => ({
        url: "/get-seo",
        method: "GET",
      }),
      providesTags: [tagTypes.adminSeo],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    updateSeo: build.mutation({
      query: (data) => ({
        url: "/admin/update-seo",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.adminSeo],
    }),
  }),
});

export const { useGetSeoQuery, useUpdateSeoMutation } = seoApi;
