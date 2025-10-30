import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminFqa: build.query({
      query: () => ({
        url: "/admin/faqs",
        method: "GET",
      }),
      providesTags: [tagTypes.fqaAdmin],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    storeAdminFqa: build.mutation({
      query: (data) => ({
        url: "/admin/faqs",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.fqaAdmin],
    }),
    updateAdminFqa: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/faqs/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.fqaAdmin],
    }),
    deleteAdminFqa: build.mutation({
      query: (id) => ({
        url: `/admin/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.fqaAdmin],
    }),
  }),
});

export const {
  useGetAdminFqaQuery,
  useStoreAdminFqaMutation,
  useUpdateAdminFqaMutation,
  useDeleteAdminFqaMutation,
} = seoApi;
