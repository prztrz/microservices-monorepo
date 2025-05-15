import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

config({ path: join(__dirname, '../../../.env') });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.MSG_BROKER_URL],
        queue: process.env.USERS_QUEUE_NAME,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen();
}
bootstrap();
