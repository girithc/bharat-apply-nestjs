import { Module } from '@nestjs/common';
import { ApplicationController } from './application-profile.controller';
import { ApplicationService } from './application-profile.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
