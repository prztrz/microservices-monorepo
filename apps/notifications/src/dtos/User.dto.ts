import {
  IsEmail,
  IsNotEmpty,
  IsRFC3339,
  IsString,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsString()
  @Matches(/^[a-f0-9]{24}$/i, { message: 'Id must be 24 hexadecimal string' })
  id: string;

  @IsRFC3339()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
