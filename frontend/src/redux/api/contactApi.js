import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    addOrUpdateMessage: builder.mutation({
      query: (formData) => ({
        url: `/contact`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Contact"],
    }),
    getAllContacts: builder.query({
      query: () => ({
        url: `/admin/contacts`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
    getContactDetails: builder.query({
      query: (id) => `/admin/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query(id) {
        return {
          url: `/admin/contacts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useAddOrUpdateMessageMutation, useGetContactDetailsQuery , useDeleteContactMutation , useGetAllContactsQuery} = contactApi;
