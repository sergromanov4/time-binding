export class createUserDto {
  login: string;
  password: string;
  name?: string;
  classCount?: number;
  isAdmin?: boolean;
}

export class accessTokenDto {
  access_token: string;
}
