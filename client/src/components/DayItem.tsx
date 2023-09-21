"use client";

import { DateTime } from "luxon";

import { dayOfWeek, dayTimeList, numberToMonth } from "@/constants/time";

import type { IDay } from "@/interfaces/date";

interface IDayItemProps {
  data: IDay;
  time: string;
  onClick: () => void;
}

const DayItem: React.FC<IDayItemProps> = ({ data, time, onClick }) => {
  const date = DateTime.fromFormat(time, "dd.MM.yyyy");

  const numberLessons = Object?.keys((data as IDay)?.time || {});

  return (
    <button
      className="p-4 bg-white rounded-xl border-slate-400 border-2 w-full h-32 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400  hover:text-white"
      onClick={onClick}
    >
      {`${date.day} ${numberToMonth[date.month]} ${date.year}`}
      <br />
      {dayOfWeek[date.weekday]}
      <br />
      {`${numberLessons.length}/${dayTimeList.length}`}
    </button>
  );
};

export default DayItem;
