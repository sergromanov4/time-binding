export class createUserDto {
  login: string;
  password: string;
  name?: string;
  description?: string;
  classCount?: number;
  isAdmin?: boolean;
}

export class updateUserDto {
  name: string;
  login: string;
  description: string;
}

export class userLoginResponse {
  login: string;
  access_token: string;
  name: string;
  description: string;
  classCount: number;
  isAdmin: boolean;
}
