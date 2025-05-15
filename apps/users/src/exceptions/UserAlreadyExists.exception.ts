export type UserAlreadyExistsExceptionName = 'UserAlreadyExistsException';

export const USER_ALREADY_EXISTS_EXCEPTION_NAME: UserAlreadyExistsExceptionName =
  'UserAlreadyExistsException';

export class UserAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = USER_ALREADY_EXISTS_EXCEPTION_NAME;
  }
}
