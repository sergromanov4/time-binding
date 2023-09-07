"use client";

import { createSlice } from "@reduxjs/toolkit";

interface IProfileSlice {
  isAutorize: boolean;
  token: string;
}

const initialState: IProfileSlice = {
  isAutorize: false,
  token: '',
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      state.isAutorize = true;
    },
  },
});

export const { setToken } = profileSlice.actions;

export default profileSlice.reducer;
