import { buildResponse } from "@/lib";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

export const proApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromotion: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/promotional-video-with-pagination",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.promoVideos],
      transformResponse: (response: any) => {
        return response.data.data;
      },
    }),
    promoVideosSlider: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/get-promotional-video",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return buildResponse(response.data)
      },
      providesTags: [tagTypes.promoVideosSlider],
    }),
  }),
});

export const { useGetPromotionQuery, usePromoVideosSliderQuery } = proApi;
