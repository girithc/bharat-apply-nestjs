import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtRefreshStratgy,
  JwtStratgy,
} from './strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStratgy,
    JwtRefreshStratgy,
    UserService,
  ],
})
export class AuthModule {}
