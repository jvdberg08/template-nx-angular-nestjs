import { defineConfig } from '@mikro-orm/core';

import { environment } from '../../../environments/environment';
import { Example } from '../../clusters/example/example.entity';
import { User } from '../../clusters/users/user.entity';

export default defineConfig({
  type: 'mysql',
  discovery: { disableDynamicFileAccess: true },
  dbName: environment.database.name,
  host: environment.database.host,
  port: environment.database.port,
  user: environment.database.user,
  password: environment.database.password,
  entities: [Example, User],
  migrations: {
    pathTs: './apps/api/src/app/database/migrations',
  },
  seeder: {
    pathTs: './apps/api/src/app/database/seeders',
    defaultSeeder: 'DatabaseSeeder',
    emit: 'ts',
    glob: '*.seeder.ts',
    fileName: (className) =>
      `${className
        .substring(0, className.indexOf('Seeder'))
        .toLowerCase()}.seeder`,
  },
});
