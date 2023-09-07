import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DateList } from './dateList.schema';
import { createDateDto, updateDateDto } from 'src/dto/date.dto';

@Injectable()
export class DateListService {
  constructor(@InjectModel(DateList.name) private dateModel: Model<DateList>) {}

  getAllDate(): any {
    return this.dateModel.find().exec();
  }

  addNewDate(dto: createDateDto): any {
    const createdDate = new this.dateModel({
      day: dto.day,
      time: {
        [dto.time]: {
          userId: 'me',
          status: 'scheduled',
        },
      },
    });
    return createdDate.save();
  }

  deleteDate(id: string): Promise<DateList> {
    return this.dateModel.findByIdAndDelete({ _id: id });
  }

  updateTime(id: string, dto: updateDateDto): Promise<DateList> {
    return this.dateModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          [`time.${dto.time}`]: {
            userId: 'me',
            status: dto.status || 'scheduled',
          },
        },
      },
    );
  }
}
