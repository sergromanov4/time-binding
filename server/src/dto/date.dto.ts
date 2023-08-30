import { Time } from 'src/dateList/dateList.schema';

export class createDateDto {
  day: string;
  time: string;
}

export class updateDateDto {
  date: string;
  time: Map<string, Time>;
}

// interface ITimeEntity {
//   userId: string;
//   status?: string;
// }
