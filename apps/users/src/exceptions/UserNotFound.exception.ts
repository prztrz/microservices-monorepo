export type UserNotFoundExceptionName = 'UserNotFoundException';

export const USER_NOT_FOUND_EXCEPTION_NAME: UserNotFoundExceptionName =
  'UserNotFoundException';

export class UserNotFoundException extends Error {
  constructor() {
    super('User not found');
    this.name = USER_NOT_FOUND_EXCEPTION_NAME;
  }
}
