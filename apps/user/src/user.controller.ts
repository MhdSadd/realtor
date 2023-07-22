import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'send-hello', transport: Transport.RMQ })
  getHello(@Payload() data, @Ctx() context: RmqContext) {
    console.log('I GOT HERE', data);
    this.userService.getHello();
    this.rmqService.ack(context);
  }
}
