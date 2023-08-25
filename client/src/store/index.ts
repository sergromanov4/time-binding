"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dateSlice from "./dateSlice";

const rootReducer = combineReducers({
  date: dateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
