import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/get-reports",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.getReport],
      transformResponse: (res: any) => {
        return buildResponse(res?.data)
      },
    }),
    getReportDetails: build.query({
      query: (id: string) => ({
        url: `/get-report-detail/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reportDetails],
    }),
    addAppeal: build.mutation({
      query: (data) => ({
        url: "/add-appeal",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useGetReportQuery,
  useGetReportDetailsQuery,
  useAddAppealMutation,
} = reportApi;
