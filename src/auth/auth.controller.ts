import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoSignup } from './dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoSignup) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}
