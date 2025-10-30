import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/blogs",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    singleBlog: build.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.singleBlog],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    storeBlogs: build.mutation({
      query: (data) => ({
        url: "/admin/blogs",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
    updateBlog: build.mutation({
      query: ({ id, data }: any) => ({
        url: `/admin/blogs/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/admin/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useSingleBlogQuery,
  useStoreBlogsMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogApi;
