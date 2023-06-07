import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ApplicationProfileDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationProfileService {
  constructor(private prisma: PrismaService) {}
  async createApplication(
    userId: number,
    dto: ApplicationProfileDto,
  ) {
    const application =
      await this.prisma.applicationProfile.create(
        {
          data: {
            userId,
            ...dto,
          },
        },
      );

    return application;
  }

  getApplicationProfiles(userId: number) {
    console.log(
      'getApplicationProfile: ',
      userId,
    );
    return this.prisma.applicationProfile.findMany(
      {
        where: {
          userId: userId,
        },
      },
    );
  }

  async editApplicationProfileById(
    userId: number,
    applicationProfileId: number,
    dto: ApplicationProfileDto,
  ) {
    console.log('SERVICE: EDIT APPLICATION');
    const applicationProfile =
      await this.prisma.applicationProfile.findUnique(
        {
          where: {
            id: applicationProfileId,
          },
        },
      );
    if (
      !applicationProfile ||
      applicationProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }
    console.log('DTO: ', dto);
    return this.prisma.applicationProfile.update({
      where: {
        id: applicationProfileId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteApplicationProfileById(
    userId: number,
    applicationProfileId: number,
  ) {
    const applicationProfile =
      await this.prisma.applicationProfile.findUnique(
        {
          where: {
            id: applicationProfileId,
          },
        },
      );
    if (
      !applicationProfile ||
      applicationProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.applicationProfile.delete({
      where: {
        id: applicationProfileId,
      },
    });
  }
}
