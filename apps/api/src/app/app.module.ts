import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AuthModule } from './clusters/auth/auth.module';
import { ExamplesModule } from './clusters/example/examples.module';
import { UsersModule } from './clusters/users/users.module';
import mikroOrmConfig from './core/config/mikro-orm.config';
import { JwtAuthGuard } from './core/guards/auth/jwt-auth.guard';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ExamplesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
