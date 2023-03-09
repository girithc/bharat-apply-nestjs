import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

//hash password
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate password
    const hash = await argon.hash(dto.password);
    //save the user in the db

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: dto.email,
          hash,
        },
      });
      //return the saved user
      delete user.hash;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'Credentials Taken',
        );
      }
      return { msg: 'helloworld' };
    }
  }

  async signin(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials are incorrect',
      );
    }
    const passwordMatch = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!passwordMatch) {
      throw new ForbiddenException(
        'Credentials are incorrect',
      );
    }

    delete user.hash;
    return user;
  }
}
