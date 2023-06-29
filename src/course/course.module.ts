import { HttpModule } from '@nestjs/axios';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
