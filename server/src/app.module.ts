import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatModule } from './cat/cat.module';
import { DateListModule } from './dateList/dateList.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    CatModule,
    DateListModule,
  ],
})
export class AppModule {}
