import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './schemas/User.schema';
import { CommonModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MSG_BROKER_SERVICE_NAME } from './config/msgBrokerConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: MSG_BROKER_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          queue: process.env.USERS_QUEUE_NAME,
          urls: [process.env.MSG_BROKER_URL],
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CommonModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
