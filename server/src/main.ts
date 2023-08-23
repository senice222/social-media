import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

const bootstrap = async () => {
  try {
    const PORT = 5000;
    const app = await NestFactory.create(AppModule, { cors: false });
    app.enableCors({ credentials: true, origin: true });
    app.useGlobalPipes(new ValidationPipe());
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Social-Media Api')
      .setDescription('pet-project')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () => console.log('server started'));
  } catch (e) {
    console.log(`server didn't started => ${e}`);
  }
};
bootstrap();
