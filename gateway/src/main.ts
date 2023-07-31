import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_GATEWAY_PORT;
  await app.listen(port, () => {
    logger.log(`App gateway started at ${port} port`);
  });
}
bootstrap();
