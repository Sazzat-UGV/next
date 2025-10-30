import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categoriesAdmin],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    storeCategory: build.mutation({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useStoreCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
