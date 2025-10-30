import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { authKey, getCookie } from "@/lib";
import axios from "axios";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      ContentType?: string;
      onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
    },
    unknown,
    unknown
  > =>
  async ({
    url,
    method,
    data,
    params,
    headers,
    ContentType,
    onUploadProgress,
  }) => {
    const accessToken = getCookie(authKey);
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        onUploadProgress,
        headers: {
          "Content-Type": ContentType || "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...headers, // Spread the headers from the function parameters
        },
      });
      return { data: result.data }; // Return the data property of the response
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
