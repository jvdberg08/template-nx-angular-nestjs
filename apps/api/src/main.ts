import { MikroORM } from '@mikro-orm/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (environment.production) {
    const orm = app.get(MikroORM);
    await orm.getSchemaGenerator().ensureDatabase();
    await orm.getMigrator().up();
  }
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env['PORT'] || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

void bootstrap();
