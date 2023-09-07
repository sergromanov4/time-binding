import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin } from "@/interfaces/user";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload: ILogin) => ({
        url: "login",
        method: "POST",
        body: payload,
      })
    }),

    register: builder.mutation({
        query: (payload: ILogin) => ({
          url: "register",
          method: "POST",
          body: payload,
        }),
      })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
} = loginApi;
