import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat } from './cat.schema';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  getAllCat(): any {
    return this.catModel.find().exec();
  }

  getCatByIndex(index: string): Promise<Cat> {
    return this.catModel.findById(index);
  }

  addNewCat(value: string): Promise<Cat> {
    const createdCat = new this.catModel({
      name: value,
    });
    return createdCat.save();
  }

  updateNewCat(index: string, value: string): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(
      { _id: index },
      {
        name: value,
      },
    );
  }

  deleteCat(index: string): Promise<Cat> {
    return this.catModel.findByIdAndDelete({ _id: index });
  }
}
