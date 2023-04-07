import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TokenService } from './token.service';

import { CreateTokenDto } from './dto';
import { GetUser } from 'src/auth/decorator';

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
    return this.tokenService.createToken(
      userId,
      dto,
    );
  }

  @Get()
  getTokens(@GetUser('id') userId: number) {
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
