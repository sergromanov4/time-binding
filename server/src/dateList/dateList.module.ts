import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DateListController } from './dateList.controller';
import { DateListService } from './dateList.service';
import { DateListSchema, DateList } from './dateList.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DateList.name, schema: DateListSchema },
    ]),
  ],
  controllers: [DateListController],
  providers: [DateListService],
})
export class DateListModule {}
