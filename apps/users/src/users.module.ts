import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './schemas/User.schema';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
