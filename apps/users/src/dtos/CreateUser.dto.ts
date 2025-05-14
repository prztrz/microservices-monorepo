import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isString } from 'lodash-es';

const trimValue = ({ value }: TransformFnParams) => {
  if (!isString(value)) {
    throw new Error('Value must be a string');
  }
  return value.trim();
};

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(trimValue)
  name: string;

  @IsEmail()
  email: string;
}
