import { useCallback, useState } from "react";

import { dayTimeList } from "@/app/constants/time";

import type { IDay } from "@/interfaces/date";

import TimeItem from "./TimeItem";
import React from "react";
import classNames from "classnames";

interface ITimeListProps {
  selectedDay: string;
  currentDayData: IDay | null;
  onResetDate: () => void;
  onSubmit: (time: string) => void;
}

const TimeList: React.FC<ITimeListProps> = ({
  selectedDay,
  currentDayData,
  onResetDate,
  onSubmit,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmit = useCallback(() => {
    onSubmit(selectedTime);
    window.scrollTo({ top: 0 });
    setSelectedTime("");
    onResetDate();
  }, [onSubmit, selectedTime, onResetDate]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-start items-center gap-12">
        <button
          className="self-start whitespace-nowrap hover:underline"
          onClick={onResetDate}
        >
          {"<- назад"}
        </button>

        <div className="text-lg text-green-900 font-bold">{selectedDay}</div>
      </div>

      <div className="w-full flex flex-col gap-4 mt-8">
        {dayTimeList.map((item) => (
          <React.Fragment key={item}>
            <TimeItem
              isActive={selectedTime === item}
              timeEntity={currentDayData?.time[item] || null}
              onClick={(value: string) => setSelectedTime(value)}
              text={item}
            />
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedTime}
        className={"flex justify-center items-center mt-8 text-white bg-green-600 hover:bg-green-700 rounded-xl border-2 border-green-800 h-4 p-4 disabled:opacity-50 disabled:cursor-not-allowed"}
      >
        Забронировать
      </button>
    </div>
  );
};

export default TimeList;
