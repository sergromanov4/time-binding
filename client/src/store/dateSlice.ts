"use client";

import { createSlice } from "@reduxjs/toolkit";

interface IDateSlice {
  isAutorize: boolean;
}

const initialState: IDateSlice = {
  isAutorize: false,
};

export const counterSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setAuthorize: (state) => {
      state.isAutorize = true;
    },
  },
});

export const { setAuthorize} = counterSlice.actions;

export default counterSlice.reducer;
