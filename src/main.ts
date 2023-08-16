import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  const swaggerConf = new DocumentBuilder()
    .setTitle('Bookmarks API')
    .setDescription('This a NEST api expample on Bookmark')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConf);

  SwaggerModule.setup('/', app, document);

  await app.listen(5000);
}
bootstrap();
