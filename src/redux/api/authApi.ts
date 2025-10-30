import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    signIn: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    otpVarify: build.mutation({
      query: (data) => ({
        url: "/auth/otp-verification",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/edit-profile",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    socialLogin: build.mutation({
      query: (data) => ({
        url: "/auth/social-login",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useOtpVarifyMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyGetProfileQuery,
  useSocialLoginMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = authApi;
