import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/User.dto';

@Injectable()
export class NotificationsService {
  greetUser(user: UserDto): void {
    console.log(`Hello ${user.name}! `);
  }

  notifyUserDeletion(user: UserDto): void {
    console.log(`User of id ${user.id} has been succesfuly deleted`);
  }
}
