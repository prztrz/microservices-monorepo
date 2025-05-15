import { Expose } from 'class-transformer';
import { CreateUserDto } from './CreateUser.dto';

export class UserDto extends CreateUserDto {
  @Expose()
  id: string;

  @Expose()
  createAt: string;
}
