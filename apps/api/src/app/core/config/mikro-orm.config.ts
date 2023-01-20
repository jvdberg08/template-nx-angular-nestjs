import { defineConfig } from '@mikro-orm/core';

import { environment } from '../../../environments/environment';
import { Example } from '../../clusters/example/example.entity';
import { User } from '../../clusters/users/user.entity';
import { Migration20230106211902 } from '../../database/migrations/Migration20230106211902';

export default defineConfig({
  type: 'mysql',
  discovery: { disableDynamicFileAccess: true },
  dbName: environment.database.name,
  host: environment.database.host,
  port: environment.database.port,
  user: environment.database.user,
  password: environment.database.password,
  driverOptions: {
    connection: {
      socketPath: environment.production
        ? `/cloudsql/${process.env['INSTANCE_CONNECTION_NAME'] ?? ''}`
        : undefined,
    },
  },
  entities: [Example, User],
  migrations: {
    migrationsList: [
      { name: Migration20230106211902.name, class: Migration20230106211902 },
    ],
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
