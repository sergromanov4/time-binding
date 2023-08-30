import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDay } from "@/interfaces/date";


export const dayListAPI = createApi({
  reducerPath: "dayListAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000`
  }),
  tagTypes: ['Day'],

  endpoints: (builder) => ({
    getDayList: builder.query<IDay[], void>({
        query: () => "dateList",
        providesTags: ['Day'],
    }),
    addNewPost: builder.mutation({
        query: (payload) => ({
          url: 'dateList',
          method: 'POST',
          body: payload,
        }),
        invalidatesTags: ['Day'],
      }),
  }),
});

export const { useGetDayListQuery, useAddNewPostMutation } = dayListAPI;