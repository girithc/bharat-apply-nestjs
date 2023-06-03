import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Options,
  Param,
  ParseIntPipe,
  Post,
  Response,
  UseGuards,
  Header
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TokenService } from './token.service';

import { CreateTokenDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { response } from 'express';

@UseGuards(JwtGuard)
@Controller('token')
export class TokenController {
  constructor(
    private tokenService: TokenService,
  ) {}

  @Post()
  createToken(
    @GetUser('id') userId: number,
    @Body() dto: CreateTokenDto,
  ) {
    console.log('createTokens');
    return this.tokenService.createToken(
      userId,
      dto,
    );
  }

  @Get()
  @Header('Access-Control-Allow-Origin','*')
  getTokens(@GetUser('id') userId: number) {
    console.log('getTokens');
    return this.tokenService.getTokens(userId);
  }


  @Get('recent')
  getMostRecentToken(
    @GetUser('id') userId: number,
  ) {
    console.log('getMostRecentToken called');
    return this.tokenService.getMostRecentToken(
      userId,
    );
  }

  @Get(':id')
  getTokenById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) tokenId: number,
  ) {
    return this.tokenService.getTokenById(
      userId,
      tokenId,
    );
  }



  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTokenById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    tokenId: number,
  ) {
    return this.tokenService.deleteTokenById(
      userId,
      tokenId,
    );
  }
}
