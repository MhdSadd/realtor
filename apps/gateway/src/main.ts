import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('GatewayBootstrap');
  const configService = new ConfigService();
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix('realtorng/api/v1');
  
  await app.listen(configService.get<string>('PORT'));
  logger.log(`Server listening on port ${configService.get<string>('PORT')}`);
}
bootstrap();
