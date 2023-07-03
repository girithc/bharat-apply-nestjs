import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      'https://entri-b56075a4324b.herokuapp.com',
      '/.entri-b56075a4324b.herokuapp.com$/',
      'https://bharatapply-backend.herokuapp.com',
      '/.bharatapply-backend.herokuapp.com$/',
      'https://bharatapply-backend.herokuapp.com/auth',
      '/.bharatapply-backend.herokuapp.com/auth$/',
      'https://bharatapply-backend.herokuapp.com/token',
      '/.bharat-apply-backend.herokuapp.com/token$/',
      'https://bharatapply-backend.herokuapp.com/college',
      '/.bharat-apply-backend.herokuapp.com/college$/',
      'https://bharatapply-backend.herokuapp.com/course',
      '/.bharat-apply-backend.herokuapp.com/course$/',
      'http://localhost:4200',
      '/.localhost:4200$/',
    ],
    methods: [
      'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    ],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'application/x-www-form-urlencoded',
    ],
    exposedHeaders: [
      'Content-Range',
      'X-Content-Range',
    ],
    optionsSuccessStatus: 210,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
