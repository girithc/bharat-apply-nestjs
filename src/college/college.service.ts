import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { College } from './dto/college.dto';

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}
  async createCollege(
    userId: number,
    dto: College,
  ) {
    const college =
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

    return college;
  }

  async getColleges() {
    return await this.prisma.college.findMany({
      select: {
        name: true,
        code: true,
        city: true,
        state: true,
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
        id: true,
      },
    });
  }
}
