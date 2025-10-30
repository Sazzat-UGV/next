import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOverview: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/dashboard",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.overviewAdmin],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
