
interface IError {
  status: number;
  data: {
    status: number;
    message: string;
  }
}

interface ILoginResponse {
    access_token: string;
}

export type { IError, ILoginResponse };
