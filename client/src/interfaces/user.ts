interface IUser {
  id: string;
  name: string;
  surname: string;
  login: string;
  password?: string;
  isAdmin?: boolean;
}

export type { IUser };
