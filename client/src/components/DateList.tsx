"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getDatesForTwoWeeks } from "@/utils/date";
import {
  useAddNewDayMutation,
  useGetDayListQuery,
  useUpdateDayMutation,
} from "@/api";

import type { IDay } from "@/interfaces/date";

import TimeList from "./TimeList";
import DayItem from "./DayItem";

const DateList = () => {
  const { data } = useGetDayListQuery();
  const [addDay] = useAddNewDayMutation();
  const [updateDay] = useUpdateDayMutation();

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const currentDayData = useMemo(() => {
    return (data && data.find((item) => item.day === selectedDay)) || null;
  }, [data, selectedDay]);

  const getDayData = useCallback(
    (day: string) => {
      return (data && data.find((item) => item.day === day)) || null;
    },
    [data],
  );

  const onSuccess = useCallback(() => {
    window.scrollTo({ top: 0 });
    setSelectedTime("");
    setSelectedDay("");
    toast.success("Время забронированно", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, []);

  const onFaild = useCallback((message?: string) => {
    toast.error(message || "Что то пошло не так. Попробуй еще раз", {
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
          .catch((res) => {
            onFaild(
              res.status === 409
                ? "Это время уже занято, обновите страницу"
                : "",
            );
          })
      : addDay({
          day: selectedDay,
          time: selectedTime,
        })
          .unwrap()
          .then(() => {
            onSuccess();
          })
          .catch((res) => {
            onFaild(
              res.status === 409
                ? "Это время уже занято, обновите страницу"
                : "",
            );
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
            <DayItem
              key={item}
              data={getDayData(item) as IDay}
              time={item}
              onClick={() => setSelectedDay(item)}
            />
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
