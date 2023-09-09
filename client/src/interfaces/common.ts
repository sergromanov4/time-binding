interface IError {
  status: number;
  data: {
    status: number;
    message: string;
  };
}

interface ILoginResponse {
  access_token: string;
  login: string;
  description: string;
  name: string;
  classCount: number;
  isAdmin: boolean;
}

export type { IError, ILoginResponse };
