import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../../.env') });

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.USERS_PORT);
}
bootstrap();
