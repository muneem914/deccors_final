import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl:`${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getUserWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (body) => ({
        url: '/wishlist',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (body) => ({
        url: '/wishlist',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;