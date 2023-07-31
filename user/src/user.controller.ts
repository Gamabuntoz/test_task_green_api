import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserInputDto } from './user-input.dto';
import { userLogger } from './user.logger';
import * as fs from 'fs';
import * as path from 'path';

@Controller('user')
export class UserController {
  //DB
  users = [
    {
      id: 1,
      name: 'John',
      age: 30,
      email: 'john@example.com',
      subscriptionPaid: false,
    },
    {
      id: 2,
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      subscriptionPaid: false,
    },
    {
      id: 3,
      name: 'Bob',
      age: 28,
      email: 'bob@example.com',
      subscriptionPaid: false,
    },
  ];

  @EventPattern('get-all')
  public async updatePaidStatus(@Payload() data: UserInputDto) {
    try {
      const user = this.users.find((user) => user.id === +data.userId);
      if (!user) {
        userLogger.log(
          'info',
          'User not found, paid subscription status is not changed',
        );
        return true;
      }
      if (user.subscriptionPaid) {
        userLogger.log('info', 'User has already paid for the subscription');
        return true;
      }
      this.users.forEach((user) => {
        if (user.id === +data.userId) {
          user.subscriptionPaid = true;
          userLogger.log(
            'info',
            'Successfully changed user paid subscription status',
          );
          return user;
        }
        return user;
      });
      return true;
    } catch (error) {
      userLogger.log(
        'error',
        `Error: ${error}, in try to change user paid subscription status`,
      );
    }
  }

  @MessagePattern('get-info-log')
  public async getInfoUsersLog() {
    const logFilePath = path.resolve(__dirname, '..', 'user.log');
    return fs.promises.readFile(logFilePath, 'utf8');
  }

  @MessagePattern('get-error-log')
  public async getErrorUsersLog() {
    const logFilePath = path.resolve(__dirname, '..', 'user-error.log');
    return fs.promises.readFile(logFilePath, 'utf8');
  }
}
