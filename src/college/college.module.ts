import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
