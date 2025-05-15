import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(trimValue)
  name: string;

  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  email: string;
}
