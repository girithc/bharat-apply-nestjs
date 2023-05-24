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
    origin: ['https://bharat-apply.herokuapp.com','http://localhost:4200/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type, Accept",
    optionsSuccessStatus: 210,
  });
  await app.listen((process.env.PORT || 3000));
}
bootstrap();
