import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createToken(
    userId: number,
    dto: CreateTokenDto,
  ) {
    const token = await this.prisma.token.create({
      data: {
        userId,
        ...dto,
      },
    });

    return token;
  }

  async getTokenById(
    userId: number,
    tokenId: number,
  ) {
    return this.prisma.token.findFirst({
      where: {
        id: tokenId,
        userId,
      },
    });
  }

  async getMostRecentToken(userId: number) {
    return this.prisma.token.findMany({
      where: {
        userId,
      },
      take: -1,
    });
  }

  async getTokens(userId: number) {
    return this.prisma.token.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteTokenById(
    userId: number,
    tokenId: number,
  ) {
    const token =
      await this.prisma.token.findUnique({
        where: {
          id: tokenId,
        },
      });

    if (!token || token.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.token.delete({
      where: {
        id: tokenId,
      },
    });
  }
}
