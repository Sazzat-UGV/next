import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContact: build.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: [tagTypes.contactus],
    }),
    updateContact: build.mutation({
      query: (data) => ({
        url: "/admin/contact",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.contactus],
    }),
    storeContact: build.mutation({
      query: (data) => ({
        url: "/send-message",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useGetContactQuery,
  useStoreContactMutation,
  useUpdateContactMutation,
} = contactApi;
