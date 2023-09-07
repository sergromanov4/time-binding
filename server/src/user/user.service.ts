import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { createUserDto } from 'src/dto/user.dto';

export type IUser = {
  _id: number;
  login: string;
  password: string;
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
}
