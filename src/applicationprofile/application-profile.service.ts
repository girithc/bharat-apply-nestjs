import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  AppFamilyDto,
  ApplicationProfileDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { AppContactIdentityDto_Outgoing } from './dto/application-contact-identity.dto';
import { AppAddressDto_Outgoing } from './dto/application-address.dto';
import {
  ApplicationGradeTenDto_out,
  ApplicationGradeTwelveDto_out,
} from './dto/application-grade.dto';

@Injectable()
export class ApplicationProfileService {
  constructor(private prisma: PrismaService) {}

  /////////
  // Create
  /////////

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

  async createApplicationGrade(
    userId: number,
    dto: ApplicationGradeTenDto_out,
  ) {
    const appGrade =
      await this.prisma.grade.create({
        data: {
          userId,
          ...dto,
        },
      });

    return appGrade;
  }

  /////////
  // Get
  /////////

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

  getApplicationGradeTen(userId: number) {
    return this.prisma.grade.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  getApplicationGradeTwelve(userId: number) {
    return this.prisma.grade.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  /////////
  // Edit
  /////////

  async editApplicationProfileById(
    userId: number,
    applicationProfileId: number,
    dto: ApplicationProfileDto,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Profile',
    );
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

  async editApplicationContactIdentityById(
    userId: number,
    applicationProfileId: number,
    dto: AppContactIdentityDto_Outgoing,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Contact Identity',
    );
    const applicationContactIdentity =
      await this.prisma.applicationProfile.findUnique(
        {
          where: {
            id: applicationProfileId,
          },
        },
      );
    if (
      !applicationContactIdentity ||
      applicationContactIdentity.userId !== userId
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

  async editApplicationAddressById(
    userId: number,
    applicationProfileId: number,
    dto: AppAddressDto_Outgoing,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Address',
    );
    const applicationAddress =
      await this.prisma.applicationProfile.findUnique(
        {
          where: {
            id: applicationProfileId,
          },
        },
      );
    if (
      !applicationAddress ||
      applicationAddress.userId !== userId
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

  async editApplicationFamilyById(
    userId: number,
    applicationProfileId: number,
    dto: AppFamilyDto,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Family',
    );
    const applicationAddress =
      await this.prisma.applicationProfile.findUnique(
        {
          where: {
            id: applicationProfileId,
          },
        },
      );
    if (
      !applicationAddress ||
      applicationAddress.userId !== userId
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

  async editApplicationGradeTen(
    userId: number,
    appGradeId: number,
    dto: ApplicationGradeTenDto_out,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Grade',
      dto,
    );

    const appGrade =
      await this.prisma.grade.findUnique({
        where: {
          id: appGradeId,
        },
      });

    if (!appGrade || appGrade.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }
    console.log('DTO: ', dto);
    return this.prisma.grade.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async addCollegeToApplicationProfile(
    userId: number,
    applicationId: number,
    collegeId: number,
  ) {
    console.log(
      'addCollegeToApplicationProfile ',
      applicationId,
    );
    const appProfile =
      await this.prisma.applicationProfile.findFirst(
        {
          where: {
            id: applicationId,
            userId: userId,
          },
        },
      );

    if (
      !appProfile ||
      appProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    console.log(
      ' Courses Added ',
      appProfile.coursesAdded,
    );

    const colleges = appProfile.collegesAdded;
    if (colleges.includes(collegeId.toString())) {
      return { message: 'Value already exists.' };
    } else {
      colleges.push(collegeId.toString());
    }

    return await this.prisma.applicationProfile.update(
      {
        where: {
          id: applicationId,
        },
        data: {
          collegesAdded: colleges,
        },
      },
    );
  }

  async addCourseToApplicationProfile(
    userId: number,
    applicationId: number,
    collegeId: number,
    courseId: number,
  ) {
    const appProfile =
      await this.prisma.applicationProfile.findFirst(
        {
          where: {
            id: applicationId,
            userId: userId,
          },
        },
      );
    const college =
      await this.prisma.college.findUnique({
        where: {
          id: collegeId,
        },
      });
    const course =
      await this.prisma.course.findFirst({
        where: {
          id: courseId,
          collegeId: collegeId,
        },
      });

    if (
      !appProfile ||
      !college ||
      !course ||
      appProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    let courses_added = appProfile.coursesAdded;

    //Empty JSON
    if (
      courses_added === null ||
      Object.keys(courses_added).length === 0
    ) {
      console.log('Courses Do Not Exist');
      courses_added = {}
      courses_added[college.id] = {
        name: [college.name],
        coursesAdded: ['1', '2'],
      };
    }
    //NOT EMPTY JSON
    else {
      console.log('Courses Exists')
      const collegeIds = Object.keys(
        courses_added,
      );

      // INCLUDES COLLEGEID
      if (
        collegeIds.includes(collegeId.toString())
      ) {
        console.log(
          'CollegeId Exists ',
          courses_added[collegeId.toString()]
            .coursesAdded,
        );
        // INCLUDES COURSEID
        if (
          courses_added[
            collegeId.toString()
          ].coursesAdded.includes(
            courseId.toString(),
          )
        ) {
          return {
            message:
              'Course Already Added To Application Profile',
          };
        }
        // DOES NOT INCLUDE COURSEID
        else {
          courses_added[
            collegeId.toString()
          ].coursesAdded.push(
            courseId.toString(),
          );
        }
      }
      // DOES NOT INCLUDE COLLEGEID
      else {
        console.log('CollegeId Does Not Exists');
        courses_added[college.id] = {
          name: [college.name],
          coursesAdded: [courseId.toString()],
        };
      }
    }

    console.log('Courses Added ', courses_added);

    return await this.prisma.applicationProfile.update(
      {
        where: {
          id: applicationId,
        },
        data: {
          coursesAdded: courses_added,
        },
      },
    );
  }

  async removeCollegeFromApplicationProfile(
    userId: number,
    applicationId: number,
    collegeId: number,
  ) {
    console.log(
      'App Profile Service ',
      applicationId,
      ' ',
      collegeId,
    );
    const appProfile =
      await this.prisma.applicationProfile.findFirst(
        {
          where: {
            id: applicationId,
            userId: userId,
          },
        },
      );

    if (
      !appProfile ||
      appProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    let colleges = appProfile.collegesAdded;
    if (colleges.includes(collegeId.toString())) {
      colleges = colleges.filter(
        (value) => value !== collegeId.toString(),
      );

      console.log('Colleges1: ', colleges);
    } else {
      return {
        message:
          'Value already removed from collegesAdded',
      };
    }

    console.log('Colleges2: ', colleges);

    return await this.prisma.applicationProfile.update(
      {
        where: {
          id: applicationId,
        },
        data: {
          collegesAdded: colleges,
        },
      },
    );
  }

  async removeCourseFromApplicationProfile(
    userId: number,
    applicationId: number,
    collegeId: number,
    courseId: number,
  ) {
    const appProfile =
      await this.prisma.applicationProfile.findFirst(
        {
          where: {
            id: applicationId,
            userId: userId,
          },
        },
      );
    const college =
      await this.prisma.college.findUnique({
        where: {
          id: collegeId,
        },
      });
    const course =
      await this.prisma.course.findFirst({
        where: {
          id: courseId,
          collegeId: collegeId,
        },
      });

    if (
      !appProfile ||
      !college ||
      !course ||
      appProfile.userId !== userId
    ) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    let courses_added = {};
    courses_added = appProfile.coursesAdded;

    //Empty JSON
    if (
      courses_added === null ||
      Object.keys(courses_added).length === 0
    ) {
      return {
        message:
          'Course Already Removed From Application Profile',
      };
    }
    //NOT EMPTY JSON
    else {
      const collegeIds = Object.keys(
        courses_added,
      );

      // INCLUDES COLLEGEID
      if (
        collegeIds.includes(collegeId.toString())
      ) {
        console.log(
          'CollegeId Exists ',
          courses_added[collegeId.toString()]
            .coursesAdded,
        );
        // INCLUDES COURSEID
        if (
          courses_added[
            collegeId.toString()
          ].coursesAdded.includes(
            courseId.toString(),
          )
        ) {
          const indexToRemove = courses_added[
            collegeId.toString()
          ].coursesAdded.indexOf(
            courseId.toString(),
          );
          if (indexToRemove !== -1) {
            courses_added[
              collegeId.toString()
            ].coursesAdded.splice(
              indexToRemove,
              1,
            );
          }
        }
        // DOES NOT INCLUDE COURSEID
        else {
          return {
            message:
              'Course Already Removed From Application Profile',
          };
        }
      }
      // DOES NOT INCLUDE COLLEGEID
      else {
        console.log('CollegeId Does Not Exists');
        return {
          message:
            'Course Already Removed From Application Profile',
        };
      }
    }

    console.log('Courses_Added ', courses_added);

    return await this.prisma.applicationProfile.update(
      {
        where: {
          id: applicationId,
        },
        data: {
          coursesAdded: courses_added,
        },
      },
    );
  }

  async editApplicationGradeTwelve(
    userId: number,
    appGradeId: number,
    dto: ApplicationGradeTwelveDto_out,
  ) {
    console.log(
      'SERVICE: EDIT APPLICATION - Grade',
    );
    console.log(
      'Service - 12 Status: ',
      dto.classTwelveStatus,
      ' 12 Stream: ',
      dto.classTwelveStream,
    );
    const appGrade =
      await this.prisma.grade.findUnique({
        where: {
          id: appGradeId,
        },
      });

    if (!appGrade || appGrade.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }
    console.log('DTO: ', dto);
    return this.prisma.grade.update({
      where: {
        userId: userId,
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
