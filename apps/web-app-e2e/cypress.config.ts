import { MikroORM } from '@mikro-orm/core';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import mikroOrmConfig from '../api/src/app/core/config/mikro-orm.config';
import { DatabaseSeeder } from '../api/src/app/database/seeders/database.seeder';
/* eslint-enable @nrwl/nx/enforce-module-boundaries */

const SEEDERS = {
  DatabaseSeeder: new DatabaseSeeder(),
} as const;

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents: (on) => {
      on('task', {
        'clear-database': async () => {
          const orm = await MikroORM.init(mikroOrmConfig);
          await orm.getSchemaGenerator().refreshDatabase();
          return null;
        },
        'seed-database': async (data: { seeder: keyof typeof SEEDERS }) => {
          const orm = await MikroORM.init({
            ...mikroOrmConfig,
            allowGlobalContext: true,
          });
          const seeder = SEEDERS[data.seeder];
          await seeder.run(orm.em);
          return null;
        },
      });
    },
  },
});
