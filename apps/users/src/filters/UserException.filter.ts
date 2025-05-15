import {
  ExceptionFilter,
  Catch,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { USER_ALREADY_EXISTS_EXCEPTION_NAME } from '../exceptions/UserAlreadyExists.exception';
import { INVALID_ID_PARAM_EXCEPTION_NAME } from '../exceptions/InvalidIdParam.excetpion';
import { USER_NOT_FOUND_EXCEPTION_NAME } from '../exceptions/UserNotFound.exception';

@Catch()
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    if (!(exception instanceof Error)) {
      throw exception;
    }

    switch (exception.name) {
      case INVALID_ID_PARAM_EXCEPTION_NAME:
      case USER_NOT_FOUND_EXCEPTION_NAME:
        throw new NotFoundException('User not found');
      case USER_ALREADY_EXISTS_EXCEPTION_NAME:
        throw new BadRequestException(exception.message);
      default:
        throw exception;
    }
  }
}
