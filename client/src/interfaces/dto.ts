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

export interface updateUserDto {
  name: string;
  login: string;
  description: string;
}
