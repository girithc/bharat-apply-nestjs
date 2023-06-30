import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './course.service';
import { GetUser } from 'src/auth/decorator';
import { CourseDto } from './dto/course.dto';

@UseGuards(JwtGuard)
@Controller('course')
export class CourseController {
  constructor(private course: CourseService) {}

  @Post(':id')
  async createCourse(
    @GetUser('id') userId: number,
    @Body() dto: CourseDto,
    @Param('id', ParseIntPipe) collegeId: number,
  ) {
    return await this.course.createCourse(
      userId,
      collegeId,
      dto,
    );
  }

  @Get(':courseId/:collegeId')
  async getCourseById(
    @Param('courseId', ParseIntPipe)
    courseId: number,
    @Param('collegeId', ParseIntPipe)
    collegeId: number,
  ) {
    console.log(
      'Course Controller - getCourseById ',
      courseId,
      ' CollegeId ',
      collegeId,
    );
    return await this.course.getCourseById(
      collegeId,
      courseId,
    );
  }

  @Get(':id')
  async getCoursesByCollegeId(
    @Param('id', ParseIntPipe) collegeId: number,
  ) {
    console.log(
      'Course Controller - getCoursesByCollegeId',
      ' CollegeId ',
      collegeId,
    );
    return await this.course.getCoursesByCollegeId(
      collegeId,
    );
  }

  @Patch(':collegeid/:courseid')
  async editCourseById(
    @Param('collegeid', ParseIntPipe)
    collegeId: number,
    @Param('courseid', ParseIntPipe)
    courseId: number,
    @Body() dto: CourseDto,
  ) {
    return await this.course.editCourseById(
      courseId,
      collegeId,
      dto,
    );
  }

  @Delete(':collegeid/:courseid')
  async deleteCourseById(
    @Param('collegeid', ParseIntPipe)
    collegeId: number,
    @Param('courseid', ParseIntPipe)
    courseId: number,
  ) {
    return await this.course.deleteCourseById(
      courseId,
      collegeId,
    );
  }
}
