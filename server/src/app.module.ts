import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DateListModule } from './dateList/dateList.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    DateListModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
