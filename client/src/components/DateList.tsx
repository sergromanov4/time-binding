"use client";

import { useCallback, useMemo, useState } from "react";

import { getDatesForTwoWeeks } from "@/utils/date";
import { useAddNewDayMutation, useGetDayListQuery, useUpdateDayMutation } from "@/api";

import TimeList from "./TimeList";

const DateList = () => {
  const { data } = useGetDayListQuery();
  const [addDay] = useAddNewDayMutation();
  const [updateDay] = useUpdateDayMutation();

  const [selectedDay, setSelectedDay] = useState<string>("");

  const currentDayData = useMemo(() => {
    return (
      (data &&
        data.find((item) => item.day === selectedDay)) ||
      null
    );
  }, [data, selectedDay]);

    const handleSubmit = useCallback((time: string) => {
      currentDayData ? 
      updateDay({
        id: currentDayData._id,
        day: selectedDay,
        time
      })
      : 
      addDay({
        day: selectedDay,
        time
      })
    }, [selectedDay]
  );

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
