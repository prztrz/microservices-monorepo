/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const users_controller_1 = __webpack_require__(4);
const users_service_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(6);
const config_1 = __webpack_require__(24);
const User_schema_1 = __webpack_require__(7);
const common_2 = __webpack_require__(15);
const microservices_1 = __webpack_require__(20);
const msgBrokerConfig_1 = __webpack_require__(19);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            microservices_1.ClientsModule.register([
                {
                    name: msgBrokerConfig_1.MSG_BROKER_SERVICE_NAME,
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        queue: process.env.USERS_QUEUE_NAME,
                        urls: [process.env.MSG_BROKER_URL],
                    },
                },
            ]),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('DB_URL'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: User_schema_1.UserSchema }]),
            common_2.CommonModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(5);
const CreateUser_dto_1 = __webpack_require__(12);
const lodash_es_1 = __webpack_require__(9);
const UserException_filter_1 = __webpack_require__(21);
const PaginationQuery_dto_1 = __webpack_require__(23);
const UserNotFound_exception_1 = __webpack_require__(22);
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers(pagination) {
        return this.usersService.getUsers(pagination);
    }
    healthCheck() { }
    async getUser(id) {
        const user = await this.usersService.getUser(id);
        if ((0, lodash_es_1.isNil)(user)) {
            throw new UserNotFound_exception_1.UserNotFoundException();
        }
        return user;
    }
    async updateUser(id, input) {
        const updatedUser = await this.usersService.updateUser(id, input);
        if ((0, lodash_es_1.isNil)(updatedUser)) {
            throw new UserNotFound_exception_1.UserNotFoundException();
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await this.usersService.deleteUser(id);
        if ((0, lodash_es_1.isNil)(deletedUser)) {
            throw new UserNotFound_exception_1.UserNotFoundException();
        }
    }
    async createUser(input) {
        return this.usersService.createUser(input);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof PaginationQuery_dto_1.PaginationQueryDto !== "undefined" && PaginationQuery_dto_1.PaginationQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/ping'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof CreateUser_dto_1.CreateUserDto !== "undefined" && CreateUser_dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof CreateUser_dto_1.CreateUserDto !== "undefined" && CreateUser_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseFilters)(UserException_filter_1.UserExceptionFilter),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(6);
const User_schema_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(8);
const lodash_es_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(10);
const User_dto_1 = __webpack_require__(11);
const UserAlreadyExists_exception_1 = __webpack_require__(14);
const common_2 = __webpack_require__(15);
const InvalidIdParam_excetpion_1 = __webpack_require__(18);
const msgBrokerConfig_1 = __webpack_require__(19);
const microservices_1 = __webpack_require__(20);
let UsersService = class UsersService {
    userModel;
    commonService;
    msgBroker;
    constructor(userModel, commonService, msgBroker) {
        this.userModel = userModel;
        this.commonService = commonService;
        this.msgBroker = msgBroker;
    }
    async getUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    userDocToDto(doc) {
        const { _id, ...userData } = doc.toObject();
        return (0, class_transformer_1.plainToInstance)(User_dto_1.UserDto, {
            ...(0, lodash_es_1.omit)(userData, '__v'),
            id: _id,
        });
    }
    async createUser(input) {
        if (await this.getUserByEmail(input.email)) {
            throw new UserAlreadyExists_exception_1.UserAlreadyExistsException(input.email);
        }
        const newUser = new this.userModel(input);
        await newUser.save();
        const newUserDto = this.userDocToDto(newUser);
        await this.msgBroker.connect();
        this.msgBroker
            .emit(...this.commonService.createUserCreatedEventTuple(newUserDto))
            .subscribe();
        return newUserDto;
    }
    async getUser(userId) {
        if (!this.commonService.isValid24Hex(userId)) {
            throw new InvalidIdParam_excetpion_1.InvalidIdParamException();
        }
        const userDoc = await this.userModel.findById(userId).exec();
        if ((0, lodash_es_1.isNil)(userDoc)) {
            return null;
        }
        return this.userDocToDto(userDoc);
    }
    async getUsers(pagination) {
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
    async deleteUser(userId) {
        const user = await this.getUser(userId);
        if ((0, lodash_es_1.isNil)(user)) {
            return null;
        }
        await this.userModel.findByIdAndDelete(userId).exec();
        return user;
    }
    async onModuleInit() {
        await this.msgBroker.connect().catch(() => 'cannot connect');
    }
    async updateUser(userId, input) {
        const user = await this.getUser(userId);
        if ((0, lodash_es_1.isNil)(user)) {
            return null;
        }
        const updatedUserDoc = await this.userModel.findByIdAndUpdate(user.id, input, { new: true, runValidators: true });
        if ((0, lodash_es_1.isNil)(updatedUserDoc)) {
            return null;
        }
        return this.userDocToDto(updatedUserDoc);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(2, (0, common_1.Inject)(msgBrokerConfig_1.MSG_BROKER_SERVICE_NAME)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof common_2.CommonService !== "undefined" && common_2.CommonService) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], UsersService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(6);
let User = class User {
    createdAt;
    name;
    email;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("lodash-es");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDto = void 0;
const class_transformer_1 = __webpack_require__(10);
const CreateUser_dto_1 = __webpack_require__(12);
class UserDto extends CreateUser_dto_1.CreateUserDto {
    id;
    createAt;
}
exports.UserDto = UserDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDto.prototype, "createAt", void 0);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_transformer_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(13);
const lodash_es_1 = __webpack_require__(9);
const trimValue = ({ value }) => {
    if (!(0, lodash_es_1.isString)(value)) {
        throw new Error('Value must be a string');
    }
    return value.trim();
};
class CreateUserDto {
    name;
    email;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(trimValue),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAlreadyExistsException = exports.USER_ALREADY_EXISTS_EXCEPTION_NAME = void 0;
exports.USER_ALREADY_EXISTS_EXCEPTION_NAME = 'UserAlreadyExistsException';
class UserAlreadyExistsException extends Error {
    constructor(email) {
        super(`User with email ${email} already exists`);
        this.name = exports.USER_ALREADY_EXISTS_EXCEPTION_NAME;
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const common_service_1 = __webpack_require__(17);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [common_service_1.CommonService],
        exports: [common_service_1.CommonService],
    })
], CommonModule);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = exports.USER_CREATED_PATTERN = void 0;
const common_1 = __webpack_require__(3);
exports.USER_CREATED_PATTERN = 'user.created';
let CommonService = class CommonService {
    constructor() { }
    isValid24Hex = (str) => /^[a-f0-9]{24}$/i.test(str);
    createUserCreatedEventTuple = (payload) => {
        return [this.getUserCreatedEventPattern(), payload];
    };
    getUserCreatedEventPattern = () => {
        return exports.USER_CREATED_PATTERN;
    };
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CommonService);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidIdParamException = exports.USER_ALREADY_EXISTS_EXCEPTION_NAME = exports.INVALID_ID_PARAM_EXCEPTION_NAME = void 0;
exports.INVALID_ID_PARAM_EXCEPTION_NAME = 'InvalidIdParamException';
exports.USER_ALREADY_EXISTS_EXCEPTION_NAME = 'InvalidIdParamException';
class InvalidIdParamException extends Error {
    constructor() {
        super();
        this.name = exports.INVALID_ID_PARAM_EXCEPTION_NAME;
    }
}
exports.InvalidIdParamException = InvalidIdParamException;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MSG_BROKER_SERVICE_NAME = void 0;
exports.MSG_BROKER_SERVICE_NAME = 'MSG_BROKER_SERVICE';


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const UserAlreadyExists_exception_1 = __webpack_require__(14);
const InvalidIdParam_excetpion_1 = __webpack_require__(18);
const UserNotFound_exception_1 = __webpack_require__(22);
let UserExceptionFilter = class UserExceptionFilter {
    catch(exception) {
        if (!(exception instanceof Error)) {
            throw exception;
        }
        switch (exception.name) {
            case InvalidIdParam_excetpion_1.INVALID_ID_PARAM_EXCEPTION_NAME:
            case UserNotFound_exception_1.USER_NOT_FOUND_EXCEPTION_NAME:
                throw new common_1.NotFoundException('User not found');
            case UserAlreadyExists_exception_1.USER_ALREADY_EXISTS_EXCEPTION_NAME:
                throw new common_1.BadRequestException(exception.message);
            default:
                throw exception;
        }
    }
};
exports.UserExceptionFilter = UserExceptionFilter;
exports.UserExceptionFilter = UserExceptionFilter = __decorate([
    (0, common_1.Catch)()
], UserExceptionFilter);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFoundException = exports.USER_NOT_FOUND_EXCEPTION_NAME = void 0;
exports.USER_NOT_FOUND_EXCEPTION_NAME = 'UserNotFoundException';
class UserNotFoundException extends Error {
    constructor() {
        super('User not found');
        this.name = exports.USER_NOT_FOUND_EXCEPTION_NAME;
    }
}
exports.UserNotFoundException = UserNotFoundException;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationQueryDto = void 0;
const class_transformer_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(13);
class PaginationQueryDto {
    page = 1;
    limit = 10;
}
exports.PaginationQueryDto = PaginationQueryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PaginationQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PaginationQueryDto.prototype, "limit", void 0);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const users_module_1 = __webpack_require__(2);
const dotenv_1 = __webpack_require__(25);
const path_1 = __webpack_require__(26);
const common_1 = __webpack_require__(3);
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../../../.env') });
async function bootstrap() {
    const app = await core_1.NestFactory.create(users_module_1.UsersModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    }));
    await app.listen(process.env.USERS_PORT);
}
bootstrap();

})();

/******/ })()
;