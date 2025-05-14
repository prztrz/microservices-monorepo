import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { config } from 'dotenv';
import { join } from 'path';
// import { ValidationPipe } from '@nestjs/common';

config({ path: join(__dirname, '../../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     forbidUnknownValues: true,
  //   }),
  // );
  await app.listen(process.env.USERS_PORT);
}
bootstrap();
