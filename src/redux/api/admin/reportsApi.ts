import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAreport: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/get-reports",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reportAdmin],
      transformResponse: (res: any) => {
        const rest = buildResponse(res?.data?.reports);
        return {
          ...rest,
          total_appeals: res?.data?.total_appeals,
        };
      },
    }),
    getReportADetails: build.query({
      query: (id) => ({
        url: `/get-report-detail/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reportDetailsAdmin],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    reportADelete: build.mutation({
      query: (id) => ({
        url: `/admin/report-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reportAdmin],
    }),
    getAappeals: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/get-appeals",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reportAdmin],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    appealADelete: build.mutation({
      query: (id) => ({
        url: `/admin/appeal-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reportAdmin],
    }),
    getAppealADetails: build.query({
      query: (id) => ({
        url: `/admin/get-appeal-details/${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    takeActionAppeal: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/take-appeal-action/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useGetAreportQuery,
  useGetReportADetailsQuery,
  useReportADeleteMutation,
  useGetAappealsQuery,
  useAppealADeleteMutation,
  useGetAppealADetailsQuery,
  useTakeActionAppealMutation
} = reportsApi;
