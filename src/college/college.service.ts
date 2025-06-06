import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { College } from './dto/college.dto';

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}

  async createCollege(
    userId: number,
    dto: College,
  ) {
    await this.prisma.college.create({
      data: {
        userId: userId,
        name: dto.name,
        code: dto.code,
        city: dto.city,
        state: dto.state,
        country: dto.country,
      },
    });

    return await this.getCollegesByUserId(userId);
  }

  async getColleges() {
    return await this.prisma.college.findMany({
      select: {
        name: true,
        code: true,
        city: true,
        state: true,
        country: true,
        id: true,
      },
    });
  }

  async getCollegesByUserId(userId: number) {
    return await this.prisma.college.findMany({
      where: {
        userId: userId,
      },
      select: {
        name: true,
        code: true,
        city: true,
        state: true,
        country: true,
        id: true,
      },
    });
  }

  async getCollegeById(
    userId: number,
    collegeId: number,
  ) {
    console.log('College Service ');
    console.log('UserId: ', userId);
    console.log('CollegeId', collegeId);

    return await this.prisma.college.findFirst({
      where: {
        userId: userId,
        id: collegeId,
      },
    });
  }

  async editCollegeById(
    userId: number,
    collegeId: number,
    dto: College,
  ) {
    const college =
      await this.prisma.college.findFirst({
        where: {
          id: collegeId,
          userId: userId,
        },
      });

    if (!college || college.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.college.update({
      where: {
        id: collegeId,
      },
      data: {
        ...dto,
      },
    });

    return await this.getCollegesByUserId(userId);
  }

  async deleteCollegeById(
    userId: number,
    collegeId: number,
  ) {
    console.log('College Service');
    console.log('User Id: ', userId);
    console.log('College Id:', collegeId);

    const college =
      await this.prisma.college.findFirst({
        where: {
          id: collegeId,
          userId: userId,
        },
      });
    if (!college || college.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.college.delete({
      where: {
        id: collegeId,
      },
    });

    return await this.getCollegesByUserId(userId);
  }
}
