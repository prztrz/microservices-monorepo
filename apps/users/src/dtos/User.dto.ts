import { Expose } from 'class-transformer';
import { CreateUserDto } from './CreateUser.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class UserDto extends CreateUserDto {
  @ApiResponseProperty({ type: String })
  @Expose()
  id: string;

  @ApiResponseProperty({ type: String, format: 'RFC333' })
  @Expose()
  createdAt: string;
}
