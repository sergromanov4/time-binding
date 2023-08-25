"use client";

import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDatesForTwoWeeks } from "@/utils/date";
import { addNewTime } from "@/store/dateSlice";

import type { IDay } from "@/interfaces/date";

import TimeList from "./TimeList";

const DateList = () => {
  const dispatch = useDispatch();

  const savedDayList: IDay[] = useSelector((store: any) => store.date.dayList);

  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleSubmit = useCallback(
    (time: string) => {
      dispatch(
        addNewTime({
          selectedDay,
          time,
        }),
      );
    },
    [selectedDay],
  );

  const currentDayData = useMemo(() => {
    return (
      (savedDayList &&
        savedDayList.find((item) => item.date === selectedDay)) ||
      null
    );
  }, [savedDayList, selectedDay]);

  return (
    <>
      {!selectedDay ? (
        <div className="grid grid-cols-3 gap-8 w-full">
          {getDatesForTwoWeeks().map((item) => (
            <button
              key={item}
              className="p-4 bg-white rounded-xl border-slate-400 border-2 w-full h-32 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400  hover:text-white"
              onClick={() => setSelectedDay(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : (
        <TimeList
          selectedDay={selectedDay}
          currentDayData={currentDayData}
          onResetDate={() => setSelectedDay("")}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default DateList;
