// import dotenv from "dotenv";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// dotenv.config({path: "../../../../frontend/.env"})

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Product", "AdminProducts", "Reviews"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ["AdminProducts"],
    }),
    getAllProducts: builder.query({
      query: () => `/allProducts`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminProducts", "Product"],
    }),
    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewsQuery,
  useDeleteReviewMutation
} = productApi;
