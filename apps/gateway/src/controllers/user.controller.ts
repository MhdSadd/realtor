import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { USER_SERVICE } from '../constants/services';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) readonly userClient: ClientProxy) {}

  @Post('hello')
  async getHello(@Body() data) {
    const hello = await lastValueFrom(
      this.userClient.send({ cmd: 'send-hello' }, data),
    );
    console.log(hello);
  }
}
