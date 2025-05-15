import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
import { UserNotFoundException } from './exceptions/UserNotFound.exception';

@UseFilters(UserExceptionFilter)
@Controller()
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() pagination: PaginationQueryDto) {
    this.logger.log('get users request');
    this.logger.log({ pagination });

    return this.usersService.getUsers(pagination);
  }

  @Get('/ping')
  @HttpCode(HttpStatus.NO_CONTENT)
  healthCheck() {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    this.logger.log('get user request');
    this.logger.log({ id });

    const user = await this.usersService.getUser(id);

    if (isNil(user)) {
      throw new UserNotFoundException();
    }

    return user;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() input: CreateUserDto) {
    this.logger.log('update user request');
    this.logger.log({ id });

    const updatedUser = await this.usersService.updateUser(id, input);
    if (isNil(updatedUser)) {
      throw new UserNotFoundException();
    }

    return updatedUser;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    this.logger.log('delete user request');
    this.logger.log({ id });

    const deletedUser = await this.usersService.deleteUser(id);
    if (isNil(deletedUser)) {
      throw new UserNotFoundException();
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() input: CreateUserDto) {
    this.logger.log('create user request');
    this.logger.log({ body: input });

    return this.usersService.createUser(input);
  }
}
