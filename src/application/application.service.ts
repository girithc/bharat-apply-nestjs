import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateApplicationDto,
  EditApplicationDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { application } from 'express';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  async createApplication(
    userId: number,
    dto: CreateApplicationDto,
  ) {
    const application =
      await this.prisma.application.create({
        data: {
          userId,
          ...dto,
        },
      });

    return application;
  }

  getApplications(userId: number) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },
    });
  }

  getApplicationById(
    userId: number,
    applicationId: number,
  ) {
    return this.prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
    });
  }

  async editApplicationById(
    userId: number,
    applicationId: number,
    dto: EditApplicationDto,
  ) {
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });
    if (
      !application ||
      application.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    return this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteApplicationById(
    userId: number,
    applicationId: number,
  ) {
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });
    if (
      !application ||
      application.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  }
}
