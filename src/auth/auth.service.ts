import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthDto_out,
  AuthDtoSignup_out,
} from './dto';

//hash password
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private user: UserService,
  ) {}

  async signup(dto: AuthDtoSignup_out) {
    //generate password
    const hash = await this.hashData(
      dto.password,
    );
    //save the user in the db

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          phone: dto.phone,
          isCollege: dto.isCollege,
          hash,
        },
      });

      if (!user.isCollege) {
        const appProfile =
          await this.prisma.applicationProfile.create(
            {
              data: {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                idProof: '',
                idProofLinks: '',
              },
            },
          );

        const appGrade =
          await this.prisma.grade.create({
            data: {
              userId: user.id,
            },
          });

        console.log(appProfile, appGrade);
      } else {
      }

      const tokens = await this.getTokens(
        user.id,
        user.email,
      );
      await this.updateRefreshToken(
        user.id,
        tokens.refreshToken,
      );
      return tokens;
    } catch (error) {
      if (error['code'] === 'P2002') {
        throw new ForbiddenException(
          'Credentials Taken',
        );
      }
      return { error: 'Unknown Error' };
    }
  }

  async signin(dto: AuthDto_out) {
    const user = await this.prisma.user.findFirst(
      {
        where: {
          email: dto.email,
          isCollege: dto.isCollege,
        },
      },
    );

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

    const tokens = await this.getTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return tokens;
  }

  async logout(userId: number) {
    return this.user.editUser(userId, {
      refreshToken: null,
    });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ) {
    const hashedRefreshToken =
      await this.hashData(refreshToken);
    await this.user.editUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(
    userId: number,
    email: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] =
      await Promise.all([
        this.jwt.signAsync(
          {
            sub: userId,
            email,
          },
          {
            secret:
              this.config.get<string>(
                'JWT_SECRET',
              ),
            expiresIn: '15m',
          },
        ),
        this.jwt.signAsync(
          {
            sub: userId,
            email,
          },
          {
            secret: this.config.get<string>(
              'JWT_REFRESH_SECRET',
            ),
            expiresIn: '1d',
          },
        ),
      ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(
    email: string,
    refreshToken: string,
  ) {
    const user = await this.user.findById(email);
    if (!user || !user.refreshToken)
      throw new ForbiddenException(
        'Access Denied',
      );
    const refreshTokenMatches =
      await argon.verify(
        user.refreshToken,
        refreshToken,
      );
    if (!refreshTokenMatches)
      throw new ForbiddenException(
        'Access Denied',
      );
    const tokens = await this.getTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return tokens;
  }

  hashData(data: string) {
    return argon.hash(data);
  }
}
