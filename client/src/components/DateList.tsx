"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getDatesForTwoWeeks } from "@/utils/date";
import {
  useAddNewDayMutation,
  useGetDayListQuery,
  useUpdateDayMutation,
} from "@/api";

import TimeList from "./TimeList";

const DateList = () => {
  const { data } = useGetDayListQuery();
  const [addDay] = useAddNewDayMutation();
  const [updateDay] = useUpdateDayMutation();

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const currentDayData = useMemo(() => {
    return (data && data.find((item) => item.day === selectedDay)) || null;
  }, [data, selectedDay]);

  const onSuccess = useCallback(() => {
    window.scrollTo({ top: 0 });
    setSelectedTime("");
    setSelectedDay("");
    toast.success("Время забронированно", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, []);

  const onFaild = useCallback(() => {
    toast.error("Что то пошло не так. Попробуй еще раз", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, []);

  const handleSubmit = useCallback(() => {
    currentDayData
      ? updateDay({
          id: currentDayData._id,
          day: selectedDay,
          time: selectedTime,
        })
          .unwrap()
          .then(() => {
            onSuccess();
          })
          .catch(() => {
            onFaild();
          })
      : addDay({
          day: selectedDay,
          time: selectedTime,
        })
          .unwrap()
          .then(() => {
            onSuccess();
          })
          .catch(() => {
            onFaild();
          });
  }, [selectedDay, selectedTime, onSuccess]);

  const handleChangeTime = useCallback(
    (value: string) => {
      setSelectedTime(value);
    },
    [selectedDay, selectedTime],
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
          selectedTime={selectedTime}
          onResetDate={() => setSelectedDay("")}
          onSubmit={handleSubmit}
          onChangeTime={handleChangeTime}
        />
      )}
    </>
  );
};

export default DateList;
