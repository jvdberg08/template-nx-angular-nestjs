import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Example } from './example.entity';
import { ExamplesController } from './examples.controller';
import { ExamplesService } from './examples.service';

@Module({
  imports: [MikroOrmModule.forFeature([Example])],
  exports: [ExamplesService],
  controllers: [ExamplesController],
  providers: [ExamplesService],
})
export class ExamplesModule {}
