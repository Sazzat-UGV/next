import { baseApi } from "./baseApi";

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    storePayment: build.mutation({
      query: (data) => ({
        url: "/payment-intent",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    successPayment: build.mutation({
      query: (data) => ({
        url: "/payment-success",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const { useStorePaymentMutation, useSuccessPaymentMutation } = stripeApi;
