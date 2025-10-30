import { baseApi } from "../baseApi";

export const fqaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqs: build.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
    }),
    // storeContact: build.mutation({
    //     query: (data) => ({
    //       url: "/send-message",
    //       method: "POST",
    //       ContentType: "multipart/form-data",
    //       data,
    //     }),
    //   }),
  }),
});

export const { useGetFaqsQuery } = fqaApi;
