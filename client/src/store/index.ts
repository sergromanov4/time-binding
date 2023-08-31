"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dateSlice from "./dateSlice";
import { dayListAPI } from "@/api";

const rootReducer = combineReducers({
  date: dateSlice,
  [dayListAPI.reducerPath]: dayListAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([dayListAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
