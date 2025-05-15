import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { Document, Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { isNil, omit } from 'lodash-es';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dtos/User.dto';
import { UserAlreadyExistsException } from './exceptions/UserAlreadyExists.exception';
import { CommonService } from '@app/common';
import { InvalidIdParamException } from './exceptions/InvalidIdParam.excetpion';

type UserDocument = Document<unknown, {}, User, {}> &
  User & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  };
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly commonService: CommonService,
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

    return this.userDocToDto(newUser);
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

  async deleteUser(userId: string): Promise<UserDto | null> {
    const user = await this.getUser(userId);
    if (isNil(user)) {
      return null;
    }

    await this.userModel.findByIdAndDelete(userId).exec();
    return user;
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
