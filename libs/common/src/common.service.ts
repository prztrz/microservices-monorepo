import { Injectable } from '@nestjs/common';
import { UserDto } from 'apps/users/src/dtos/User.dto';

const USER_CREATED_PATTERN = 'user.created' as const;
type UserCreatedEventTuple = [typeof USER_CREATED_PATTERN, UserDto];
@Injectable()
export class CommonService {
  constructor() {}

  isValid24Hex = (str: string): boolean => /^[a-f0-9]{24}$/i.test(str);
  createUserCreatedEventTuple = (user: UserDto): UserCreatedEventTuple => {
    return [USER_CREATED_PATTERN, user];
  };
}
