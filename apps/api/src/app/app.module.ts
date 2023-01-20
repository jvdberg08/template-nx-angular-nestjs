import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ExamplesModule } from './clusters/example/examples.module';
import mikroOrmConfig from './core/config/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), ExamplesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
