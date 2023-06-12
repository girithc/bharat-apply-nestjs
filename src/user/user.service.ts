import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }

  async findById(email: string) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

    delete user.hash;

    return user;
  }

  async deleteUser(userId: number) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    if (!user || user.id !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
