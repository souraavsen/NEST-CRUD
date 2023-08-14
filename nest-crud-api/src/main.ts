import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConf = new DocumentBuilder()
    .setTitle('Nest CRUD API')
    .setDescription('This a NEST api expample')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConf);

  SwaggerModule.setup('/', app, document);

  await app.listen(5000);
}
bootstrap();
