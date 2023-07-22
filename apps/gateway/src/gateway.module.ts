import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { USER_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class GatewayModule {}
