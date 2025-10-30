import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSalesRepresen: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/sales-representatives",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.salesRepresentatives],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    storeSalesRepresen: build.mutation({
      query: (data) => ({
        url: "/admin/sales-representatives",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.salesRepresentatives],
    }),
    getDetailsSalesRepresen: build.query({
      query: (id: string) => ({
        url: `/admin/sales-representatives/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.salesRepresentDetails],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    deleteSalesRepresen: build.mutation({
      query: (id) => ({
        url: `/admin/sales-representatives/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.salesRepresentatives],
    }),
  }),
});

export const {
  useGetSalesRepresenQuery,
  useStoreSalesRepresenMutation,
  useGetDetailsSalesRepresenQuery,
  useDeleteSalesRepresenMutation,
} = salesApi;
