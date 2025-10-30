import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrice: build.query({
      query: () => ({
        url: "/get-price",
        method: "GET",
      }),
      providesTags: [tagTypes.getPricings],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    storePrice: build.mutation({
      query: (data) => ({
        url: "/admin/update-price",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.getPricings],
    }),
    getTransactions: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin/transactions",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.transactionsAdmin],
      transformResponse: (res: any) => {
        const rest = buildResponse(res?.data?.transactions);
        return {
          ...rest,
          earned_this_month: res?.data?.earned_this_month,
        };
      },
    }),
  }),
});

export const {
  useGetPriceQuery,
  useStorePriceMutation,
  useGetTransactionsQuery,
} = pricingApi;
