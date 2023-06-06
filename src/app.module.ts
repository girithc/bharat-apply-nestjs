import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { ApplicationProfileModule } from './applicationprofile/application-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ApplicationModule,
    PrismaModule,
    TokenModule,
    ApplicationProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
