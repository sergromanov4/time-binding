import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenDto } from 'src/dto/user.dto';

import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, pass: string): Promise<accessTokenDto> {
    const user = await this.userService.findOne(login);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const access_token = await this.jwtService.signAsync({
      sub: user.login,
      password: user.password,
    });
    return { access_token };
  }

  async register(login: string, password: string): Promise<accessTokenDto> {
    const user = await this.userService.findOne(login);

    if (!user) {
      const newUser = await this.userService.addNewUser({
        name: '',
        login: login,
        password: password,
        classCount: 0,
        isAdmin: false,
      });

      const access_token = await this.jwtService.signAsync({
        sub: newUser.login,
        password: newUser.password,
      });

      return { access_token };
    } else {
      throw new HttpException('Такой пользователь уже существует', 403);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
