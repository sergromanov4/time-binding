"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import profileSlice from "./profileSlice";
import { dayListAPI } from "@/api";
import { loginApi } from "@/api/loginApi";

const rootReducer = combineReducers({
  profile: profileSlice,
  [dayListAPI.reducerPath]: dayListAPI.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([dayListAPI.middleware, loginApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
