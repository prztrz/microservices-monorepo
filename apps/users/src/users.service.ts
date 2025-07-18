import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { Document, Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { isNil, omit } from 'lodash-es';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dtos/User.dto';
import { UserAlreadyExistsException } from './exceptions/UserAlreadyExists.exception';
import {
  CommonService,
  USER_CREATED_PATTERN,
  USER_DELETED_PATTERN,
} from '@app/common';
import { InvalidIdParamException } from './exceptions/InvalidIdParam.excetpion';
import { PaginationQueryDto } from './dtos/PaginationQuery.dto';
import { MSG_BROKER_SERVICE_NAME } from './config/msgBrokerConfig';
import { ClientProxy } from '@nestjs/microservices';

type UserDocument = Document<unknown, {}, User, {}> &
  User & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  };

type PaginationMetadata = {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  hasNextPage: boolean;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly commonService: CommonService,
    @Inject(MSG_BROKER_SERVICE_NAME) private msgBroker: ClientProxy,
  ) {}

  private async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  private userDocToDto(doc: UserDocument): UserDto {
    const { _id, ...userData } = doc.toObject();
    return plainToInstance(UserDto, {
      ...omit(userData, '__v'),
      id: _id,
    });
  }

  async createUser(input: CreateUserDto): Promise<UserDto> {
    if (await this.getUserByEmail(input.email)) {
      throw new UserAlreadyExistsException(input.email);
    }

    const newUser = new this.userModel(input);
    await newUser.save();

    const newUserDto = this.userDocToDto(newUser);

    this.msgBroker.emit<typeof USER_CREATED_PATTERN, UserDto>(
      ...this.commonService.createUserCreatedEventTuple(newUserDto),
    );

    return newUserDto;
  }

  async getUser(userId: string): Promise<UserDto | null> {
    if (!this.commonService.isValid24Hex(userId)) {
      throw new InvalidIdParamException();
    }

    const userDoc = await this.userModel.findById(userId).exec();

    if (isNil(userDoc)) {
      return null;
    }

    return this.userDocToDto(userDoc);
  }

  async getUsers(
    pagination: PaginationQueryDto,
  ): Promise<{ data: UserDto[]; meta: PaginationMetadata }> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(),
    ]);

    const pageCount = Math.ceil(total / limit);
    const hasNextPage = page < pageCount;

    return {
      data: users.map((user) => this.userDocToDto(user)),
      meta: {
        total,
        page,
        limit,
        pageCount,
        hasNextPage,
      },
    };
  }

  async deleteUser(userId: string): Promise<UserDto | null> {
    const user = await this.getUser(userId);
    if (isNil(user)) {
      return null;
    }

    await this.userModel.findByIdAndDelete(userId).exec();

    this.msgBroker.emit<typeof USER_DELETED_PATTERN, UserDto>(
      ...this.commonService.createUserDeletedEventTuple(user),
    );

    return user;
  }

  async onModuleInit() {
    await this.msgBroker.connect();
  }

  async updateUser(
    userId: string,
    input: CreateUserDto,
  ): Promise<UserDto | null> {
    const user = await this.getUser(userId);
    if (isNil(user)) {
      return null;
    }

    const updatedUserDoc = await this.userModel.findByIdAndUpdate(
      user.id,
      input,
      { new: true, runValidators: true },
    );

    if (isNil(updatedUserDoc)) {
      return null;
    }

    return this.userDocToDto(updatedUserDoc);
  }
}
