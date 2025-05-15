export type InvalidIdParamExceptionName = 'InvalidIdParamException';

export const INVALID_ID_PARAM_EXCEPTION_NAME: InvalidIdParamExceptionName =
  'InvalidIdParamException';

export const USER_ALREADY_EXISTS_EXCEPTION_NAME: InvalidIdParamExceptionName =
  'InvalidIdParamException';

export class InvalidIdParamException extends Error {
  constructor() {
    super();
    this.name = INVALID_ID_PARAM_EXCEPTION_NAME;
  }
}
