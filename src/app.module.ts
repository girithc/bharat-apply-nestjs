import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { ApplicationProfileModule } from './applicationprofile/application-profile.module';
import { CollegeModule } from './college/college.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ApplicationModule,
    PrismaModule,
    TokenModule,
    ApplicationProfileModule,
    CollegeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
