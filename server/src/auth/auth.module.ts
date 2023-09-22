import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'mySecret',
      signOptions: { expiresIn: '1800s' },
    }),
  ],
})
export class AuthModule {}
