import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DateList } from './dateList.schema';
import { createDateDto, updateDateDto } from 'src/dto/date.dto';

@Injectable()
export class DateListService {
  constructor(@InjectModel(DateList.name) private dateModel: Model<DateList>) {}

  private async checkTimeByDay(day: string, time: string): Promise<boolean> {
    let result = false;

    await this.dateModel
      .findOne({ day })
      .exec()
      .then((res) => {
        if (res) {
          result = res.time.has(time);
          return;
        }
        result = false;
      });

    return result;
  }

  getAllDate(): any {
    return this.dateModel.find().exec();
  }

  addNewDate(dto: createDateDto): any {
    this.checkTimeByDay(dto.day, dto.time);

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
    return this.checkTimeByDay(dto.day, dto.time).then(
      (alreadyExists: boolean) => {
        if (alreadyExists) {
          throw new ConflictException();
        }

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
      },
    );
  }
}
