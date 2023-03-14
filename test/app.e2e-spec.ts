import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import {
  CreateApplicationDto,
  EditApplicationDto,
} from 'src/application/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: '123@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw exception if email and password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw exception if email and password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores(
            'user_access_token',
            'access_token',
          );
      });
    });
  });

  describe('User', () => {
    describe('Get Current User', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          firstName: 'Zlatan',
          email: 'zlatan@ibrahimovic.com',
        };
        return pactum
          .spec()
          .patch('/users/me')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Applications', () => {
    describe('No Applications', () => {
      it('should get applications', () => {
        return pactum
          .spec()
          .get('/applications')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create Application', () => {
      const dto: CreateApplicationDto = {
        title: 'First Application',
        link: 'https://youtube.com',
        description: 'Youtube Application',
      };
      it('should create application', () => {
        return pactum
          .spec()
          .post('/applications')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('applicationId', 'id');
      });
    });
    describe('Get Applications', () => {
      it('should get applications', () => {
        return pactum
          .spec()
          .get('/applications')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get Application by Id', () => {
      it('should get application', () => {
        return pactum
          .spec()
          .get('/applications/{id}')
          .withPathParams(
            'id',
            '$S{applicationId}',
          )
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(200)
          .expectBodyContains(
            '$S{applicationId}',
          );
      });
    });
    describe('Edit Application', () => {
      //get applicaton by id
      //check if user owns the application
      const dto: EditApplicationDto = {
        title: 'Changed Application',
        link: 'https://youtube.changed.com',
        description: 'Changed Description',
      };
      it('should edit application', () => {
        return pactum
          .spec()
          .patch('/applications/{id}')
          .withPathParams(
            'id',
            '$S{applicationId}',
          )
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });
    describe('Delete Application', () => {
      it('should delete application', () => {
        return pactum
          .spec()
          .delete('/applications/{id}')
          .withPathParams(
            'id',
            '$S{applicationId}',
          )
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(204);
      });

      it('should get applications', () => {
        return pactum
          .spec()
          .get('/applications')
          .withHeaders({
            Authorization:
              'Bearer $S{user_access_token}',
          })
          .expectStatus(200)
          .expectBody([])
          .inspect();
      });
    });
  });
});
