import { Module } from '@nestjs/common';
import { ApplicationProfileController } from './application-profile.controller';
import { ApplicationProfileService } from './application-profile.service';

@Module({
  controllers: [ApplicationProfileController],
  providers: [ApplicationProfileService],
})
export class ApplicationProfileModule {}
