import { Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as path from 'path';
import * as fs from 'fs';
import { gatewayLogger } from './gateway.logger';

@Controller('gateway')
export class GatewayController {
  constructor(
    @Inject(process.env.USER_SERVICE_HOST) private usersService: ClientProxy,
  ) {}

  @Get('/')
  async mainPage() {
    try {
      const res = `Hello from ${GatewayController.name}`;
      gatewayLogger.log('info', 'Response for main page successfully created');
      return res;
    } catch (error) {
      gatewayLogger.log(
        'error',
        `Error: ${error}, in try to create response for main page`,
      );
    }
  }

  @Put('/users/:userId')
  async updatePaidStatus(@Param('userId') userId: string) {
    try {
      await this.usersService.emit('get-all', { userId });
      gatewayLogger.log(
        'info',
        'Request for change change user paid subscription status successfully sent',
      );
      return true;
    } catch (error) {
      gatewayLogger.log(
        'error',
        `Error: ${error}, in try to create response for main page`,
      );
    }
  }

  //Эндпоинты для получения логов из файлов
  @Get('/log')
  async getInfoGatewayLog() {
    const logFilePath = path.resolve(__dirname, '..', 'gateway.log');
    return fs.promises.readFile(logFilePath, 'utf8');
  }

  @Get('/error-log')
  async getErrorGatewayLog() {
    const logFilePath = path.resolve(__dirname, '..', 'gateway-error.log');
    return fs.promises.readFile(logFilePath, 'utf8');
  }

  @Get('/users/log')
  async getInfoUsersLog() {
    return this.usersService.send('get-info-log', {});
  }

  @Get('/users/error-log')
  async getErrorUsersLog() {
    return this.usersService.send('get-error-log', {});
  }
}
