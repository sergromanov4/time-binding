import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDay } from "@/interfaces/date";
import { createDateDto, updateDateDto, updateUserDto } from "@/interfaces/dto";
import { IRootStore } from "@/store";

export const dayListAPI = createApi({
  reducerPath: "dayListAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as IRootStore).profile.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Day"],

  endpoints: (builder) => ({
    getDayList: builder.query<IDay[], void>({
      query: () => "dateList",
      providesTags: ["Day"],
    }),
    addNewDay: builder.mutation({
      query: (payload: createDateDto) => ({
        url: "dateList",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Day"],
    }),
    updateDay: builder.mutation({
      query: (payload: updateDateDto) => ({
        url: `dateList/${payload.id}`,
        method: "PATCH",
        body: {
          day: payload.day,
          time: payload.time,
        },
      }),
      invalidatesTags: ["Day"],
    }),
    updateUser: builder.mutation({
      query: (payload: updateUserDto) => ({
        url: `/auth/users`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetDayListQuery,
  useAddNewDayMutation,
  useUpdateDayMutation,
  useUpdateUserMutation,
} = dayListAPI;
