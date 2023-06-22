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

import {
  JwtGuard,
  JwtRefreshTokenGuard,
} from '../auth/guard';
import { AuthService } from './auth.service';
import {
  AuthDto_in,
  AuthDto_out,
  AuthDtoSignup_in,
  AuthDtoSignup_out,
} from './dto';
import { Request } from 'express';
//comment
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoSignup_in) {
    const dto_out: AuthDtoSignup_out =
      new AuthDtoSignup_out();

    dto_out.email = dto.email;
    dto_out.firstName = dto.firstName;
    dto_out.lastName = dto.lastName;
    dto_out.password = dto.password;
    dto_out.phone = Number(dto.phone);
    if (dto.isCollege == 'true') {
      dto_out.isCollege = true;
    } else {
      dto_out.isCollege = false;
    }

    return this.authService.signup(dto_out);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto_in) {
    const dto_out: AuthDto_out =
      new AuthDto_out();

    dto_out.email = dto.email;
    dto_out.password = dto.password;
    if (dto.isCollege == 'true') {
      dto_out.isCollege = true;
    } else {
      dto_out.isCollege = false;
    }

    return this.authService.signin(dto_out);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['user'].email;
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(
      userId,
      refreshToken,
    );
  }
}
