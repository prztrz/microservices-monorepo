import { Injectable } from '@nestjs/common';

export const USER_CREATED_PATTERN = 'user.created' as const;
export const USER_DELETED_PATTERN = 'user.deleted' as const;

type UserCreatedEventTuple<Payload> = [typeof USER_CREATED_PATTERN, Payload];
type UserDeletedEventTuple<Payload> = [typeof USER_DELETED_PATTERN, Payload];

@Injectable()
export class CommonService {
  constructor() {}

  isValid24Hex = (str: string): boolean => /^[a-f0-9]{24}$/i.test(str);
  createUserCreatedEventTuple = <Payload>(
    payload: Payload,
  ): UserCreatedEventTuple<Payload> => {
    return [this.getUserCreatedEventPattern(), payload];
  };

  createUserDeletedEventTuple = <Payload>(
    payload: Payload,
  ): UserDeletedEventTuple<Payload> => {
    return [this.getUserDeletedPattern(), payload];
  };

  getUserCreatedEventPattern = (): typeof USER_CREATED_PATTERN => {
    return USER_CREATED_PATTERN;
  };

  getUserDeletedPattern = (): typeof USER_DELETED_PATTERN => {
    return USER_DELETED_PATTERN;
  };
}
