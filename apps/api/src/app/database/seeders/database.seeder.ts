import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { hashSync } from 'bcrypt';

import { ExampleFactory } from '../factories/example.factory';
import { UserFactory } from '../factories/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new UserFactory(em).createOne({
      email: 'development@riskchallenger.nl',
      password: hashSync('Evolution36!', 8),
    });
    await new UserFactory(em).create(3);
    await new ExampleFactory(em).create(10);
  }
}
