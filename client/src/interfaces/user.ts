interface IUser {
  id: string;
  name: string;
  surname: string;
  login: string;
  password?: string;
  isAdmin?: boolean;
}

interface ILogin {
  login: string;
  password: string;
}

export type { IUser, ILogin };
