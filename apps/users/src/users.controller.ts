import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { isNil } from 'lodash-es';
import { UserExceptionFilter } from './filters/UserException.filter';
import { PaginationQueryDto } from './dtos/PaginationQuery.dto';

@UseFilters(UserExceptionFilter)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() pagination: PaginationQueryDto) {
    return this.usersService.getUsers(pagination);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);

    if (isNil(user)) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() input: CreateUserDto) {
    const updatedUser = await this.usersService.updateUser(id, input);
    if (isNil(updatedUser)) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUser(id);
    if (isNil(deletedUser)) {
      throw new NotFoundException('User not found');
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() input: CreateUserDto) {
    return this.usersService.createUser(input);
  }

  @Get('/ping')
  @HttpCode(HttpStatus.NO_CONTENT)
  healthCheck() {}
}
