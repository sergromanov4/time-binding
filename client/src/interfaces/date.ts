import { EStatus } from "@/app/constants/time";

interface IDay {
  _id: string;
  time: ITime;
  day: string;
}

interface ITimeEntity {
  userId: string;
  status: EStatus;
}

interface ITime {
  [key: string]: ITimeEntity;
}

export type { IDay, ITime, ITimeEntity };
