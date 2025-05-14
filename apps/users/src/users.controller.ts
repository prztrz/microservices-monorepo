import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  healthCheck(): string {
    return this.usersService.healthCheck();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string) {
    console.log('id', id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string) {
    console.log('id', id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    console.log('id', id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() input: CreateUserDto) {
    return 'User created';
  }
}
