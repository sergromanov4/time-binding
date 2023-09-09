import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { updateUserDto } from 'src/dto/user.dto';

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

  @UseGuards(AuthGuard)
  @Patch('users')
  updateUser(@Body() dto: updateUserDto) {
    return this.authService.updateUser(dto);
  }
}
