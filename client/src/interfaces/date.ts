import { EStatus } from "@/app/constants/time";

interface IDay {
  id: string;
  time: ITime;
  date: string;
}

interface ITimeEntity {
  userId: string;
  status: EStatus;
}

interface ITime {
  [key: string]: ITimeEntity;
}

export type { IDay, ITime, ITimeEntity };
