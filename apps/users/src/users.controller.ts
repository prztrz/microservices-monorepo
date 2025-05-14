import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //API health check
  @Get('/')
  healthCheck(): string {
    return this.usersService.healthCheck();
  }

  @Post('/')
  createUser(): string {
    return 'User created';
  }
}
