import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { updateUserDto, userLoginResponse } from 'src/dto/user.dto';

import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
  ) {}

  async login(login: string, pass: string): Promise<userLoginResponse> {
    const user = await this.userService.findOne(login);

    return this.bcrypt
      .compare(pass, user?.password || '')
      .then(async (result) => {
        if (!result) {
          throw new UnauthorizedException();
        }

        const access_token = await this.jwtService.signAsync({
          sub: user.login,
          password: pass,
        });

        return {
          login: user.login,
          name: user.name,
          description: user.description,
          classCount: user.classCount,
          isAdmin: user.isAdmin,
          access_token,
        };
      });
  }

  async register(login: string, password: string): Promise<userLoginResponse> {
    const user = await this.userService.findOne(login);

    if (!user) {
      return this.bcrypt
        .hash(password)
        .then(async (hashedPass: string) => {
          const newUser = await this.userService.addNewUser({
            name: '',
            login: login,
            password: hashedPass,
            classCount: 0,
            isAdmin: false,
          });

          const access_token = await this.jwtService.signAsync({
            sub: newUser.login,
            password: hashedPass,
          });

          return {
            login: newUser.login,
            name: newUser.name,
            description: newUser.description,
            classCount: newUser.classCount,
            isAdmin: newUser.isAdmin,
            access_token,
          };
        })
        .catch(() => {
          throw new HttpException('Что то пошло не так', 401);
        });
    } else {
      throw new HttpException('Такой пользователь уже существует', 403);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  async updateUser(dto: updateUserDto): Promise<User> {
    return await this.userService.updateUser(dto);
  }
}
