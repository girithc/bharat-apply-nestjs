import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://gchoudhary:jewXab-dacwu7-wiwdad@localhost:5432/bharatapplydb?schema=public',
        },
      },
    });
  }
}
