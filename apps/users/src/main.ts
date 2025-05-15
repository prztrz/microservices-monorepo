import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { config } from 'dotenv';
import { join } from 'path';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config({ path: join(__dirname, '../../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(UsersModule, {
    logger: new ConsoleLogger({
      prefix: 'users',
      logLevels: ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'],
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.USERS_PORT);
}
bootstrap();
