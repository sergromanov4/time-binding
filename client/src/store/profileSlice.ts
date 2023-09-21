"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { ILoginResponse } from "@/interfaces/common";
import type { IUserInfo } from "@/interfaces/user";

interface IProfileSlice {
  isAuthorized: boolean;
  token: string;
  userInfo: IUserInfo;
}

const initialState: IProfileSlice = {
  isAuthorized: false,
  token: "",
  userInfo: {
    login: "",
    description: "",
    name: "",
    classCount: 0,
    isAdmin: false,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<ILoginResponse>) => {
      state.token = payload.access_token;
      state.isAuthorized = true;
      state.userInfo.classCount = payload.classCount;
      state.userInfo.login = payload.login;
      state.userInfo.description = payload.description;
      state.userInfo.name = payload.name;
      state.userInfo.isAdmin = payload.isAdmin;
    },
    updateProfile: (state, { payload }: PayloadAction<ILoginResponse>) => {
      state.userInfo.description = payload.description;
      state.userInfo.name = payload.name;
    },
    resetAuth: () => {
      return initialState;
    },
  },
});

export const { setToken, updateProfile, resetAuth } = profileSlice.actions;

export default profileSlice.reducer;
