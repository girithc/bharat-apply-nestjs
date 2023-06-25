import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStratgy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });

    console.log('JWT: ', ExtractJwt.fromAuthHeaderAsBearerToken())
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    console.log('JWT Strategy', { payload });
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });

    delete user.hash;
    //console.log(user);
    return user;
  }
}
