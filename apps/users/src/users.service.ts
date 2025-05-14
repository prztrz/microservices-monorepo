import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  healthCheck(): string {
    return 'OK';
  }
}
