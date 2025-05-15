import { Controller, Logger } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { USER_CREATED_PATTERN, USER_DELETED_PATTERN } from '@app/common';
import { UserDto } from './dtos/User.dto';

@Controller()
export class NotificationsController {
  private logger = new Logger(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(USER_CREATED_PATTERN)
  handleUserCreated(@Payload() user: UserDto): void {
    this.logger.log(`${USER_CREATED_PATTERN} message recived`);

    this.notificationsService.greetUser(user);
  }

  @EventPattern(USER_DELETED_PATTERN)
  handleUserDeleted(@Payload() user: UserDto): void {
    this.logger.log(`${USER_DELETED_PATTERN} message recived`);

    this.notificationsService.notifyUserDeletion(user);
  }
}
