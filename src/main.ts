import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import path from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1')
  // app.use('/uploadProfile/profile', express.static(path.join(__dirname, '..', 'uploadProfile', 'profile')));
  const config = new DocumentBuilder()
    .setTitle('New Negcon BackEnd')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
