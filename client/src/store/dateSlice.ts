"use client";

import { createSlice } from "@reduxjs/toolkit";

import { IDay } from "@/interfaces/date";
import { EStatus } from "@/app/constants/time";

interface IDateSlice {
  dayList: IDay[];
}

const initialState: IDateSlice = {
  dayList: [
    {
      id: "v1",
      date: "25.08.2023",
      time: {
        ["10-11"]: {
          userId: "me",
          status: EStatus.scheduled,
        },
        ["12-13"]: {
          userId: "me",
          status: EStatus.scheduled,
        },
      },
    },
  ],
};

export const counterSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    addNewTime: (
      state,
      {
        payload,
      }: {
        payload: {
          selectedDay: string;
          time: string;
        };
      },
    ) => {
      const currentDay = state.dayList.find(
        (item) => item.date === payload.selectedDay,
      );

      if (currentDay) {
        currentDay.time = {
          ...currentDay.time,
          [payload.time]: {
            userId: "me",
            status: EStatus.scheduled,
          },
        };
      } else {
        state.dayList.push({
          id: state.dayList.length.toString(),
          date: payload.selectedDay,
          time: {
            [payload.time]: {
              userId: "me",
              status: EStatus.scheduled,
            },
          },
        });
      }
    },
  },
});

export const { addNewTime } = counterSlice.actions;

export default counterSlice.reducer;
