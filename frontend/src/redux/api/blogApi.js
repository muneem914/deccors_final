import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl:`${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["AllBlogs", "Update", "AdminBlogs", "Comment"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["AllBlogs", "Update"],
    }),
    getBlogDetails: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: ["Update", "Comment"],
    }),
    getAdminBlogs: builder.query({
      query: () => `/admin/blogs`,
      providesTags: ["AdminBlogs", "AllBlogs", "Update", "Comment"],
    }),
    createNewBlog: builder.mutation({
      query(blogData) {
        return {
          url: "/admin/blogs/new",
          method: "POST",
          body: blogData,
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    updateBlog: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/blogs/${id}/update_blog_data`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AllBlogs", "Update"],
    }),
    updateBlogImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/blogs/${id}/update_image`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AllBlogs", "Update"],
    }),
    deleteBlogImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/blogs/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AllBlogs", "Update"],
    }),
    deleteBlog: builder.mutation({
      query(id) {
        return {
          url: `/admin/blogs/${id}/delete_full_blog`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    addComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteBlogComment: builder.mutation({
      query: ({ blogId, commentId }) => ({
        url: `/admin/blogs/${blogId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetAdminBlogsQuery,
  useGetBlogDetailsQuery,
  useUpdateBlogImageMutation,
  useDeleteBlogImageMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useCreateNewBlogMutation,
  useAddCommentMutation,
  useDeleteBlogCommentMutation,
} = blogApi;
