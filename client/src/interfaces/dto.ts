export interface createDateDto {
  day: string;
  time: string;
}

export interface updateDateDto {
  id: string;
  day: string;
  time: string;
  status?: string;
}
