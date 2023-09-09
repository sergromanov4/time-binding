import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { createUserDto, updateUserDto } from 'src/dto/user.dto';

export type IUser = {
  _id: number;
  login: string;
  description: string;
  password: string;
  access_token: string;
  name: string;
  classCount: number;
  isAdmin: boolean;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private users: Model<User>) {}

  async findOne(login: string): Promise<IUser> {
    return this.users.findOne({ login });
  }

  async addNewUser(dto: createUserDto): Promise<User> {
    const createdDate = new this.users(dto);
    return createdDate.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.users.find().exec();
  }

  async updateUser(dto: updateUserDto): Promise<User> {
    return this.users.findOneAndUpdate(
      { login: dto.login },
      {
        name: dto.name,
        description: dto.description,
      },
      { new: true },
    );
  }
}
