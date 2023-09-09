interface IUser {
  id: string;
  name: string;
  surname: string;
  description: string;
  login: string;
  password?: string;
  isAdmin?: boolean;
}

interface IUserInfo {
  login: string;
  name: string;
  description: string;
  classCount: number;
  isAdmin: boolean;
}

interface ILogin {
  login: string;
  password: string;
}

export type { IUser, ILogin, IUserInfo };
