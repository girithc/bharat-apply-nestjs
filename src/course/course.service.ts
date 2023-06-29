import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(
    userId: number,
    collegeId: number,
    dto: CourseDto,
  ) {
    await this.prisma.course.create({
      data: {
        collegeId,
        userId,
        ...dto,
      },
    });

    return await this.getCoursesByCollegeId(
      collegeId,
    );
  }

  async getCoursesByCollegeId(collegeId: number) {
    return this.prisma.course.findMany({
      where: {
        collegeId,
      },
      select: {
        name: true,
        subject: true,
        department: true,
        stream: true,
        collegeId: true,
        startDate: true,
        endDate: true,
        admissionStartDate: true,
        admissionEndDate: true,
      },
    });
  }

  async editCourseById(
    courseId: number,
    collegeId: number,
    dto: CourseDto,
  ) {
    const course =
      await this.prisma.course.findFirst({
        where: {
          id: courseId,
          collegeId: collegeId,
        },
      });

    if (
      !course ||
      course.collegeId !== collegeId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...dto,
      },
    });

    return await this.getCoursesByCollegeId(
      courseId,
    );
  }

  async deleteCourseById(
    courseId: number,
    collegeId: number,
  ) {
    const course =
      await this.prisma.course.findFirst({
        where: {
          id: courseId,
          collegeId: collegeId,
        },
      });

    if (
      !course ||
      course.collegeId !== collegeId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }
    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return await this.getCoursesByCollegeId(
      collegeId,
    );
  }
}
