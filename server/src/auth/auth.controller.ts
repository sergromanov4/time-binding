import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: Record<string, any>) {
    return this.authService.login(loginDto.login, loginDto.password);
  }

  @Post('register')
  register(@Body() loginDto: Record<string, any>) {
    return this.authService.register(loginDto.login, loginDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getAllUser() {
    return this.authService.getAllUsers();
  }
}
