import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query({
      query: () => ({
        url: "/about-us",
        method: "GET",
      }),
      providesTags: [tagTypes.aboutAdmin],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    updateAbout: build.mutation({
      query: ({id,data}) => ({
        url: `/admin/about-us/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.aboutAdmin],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useUpdateAboutMutation
} = aboutApi;
