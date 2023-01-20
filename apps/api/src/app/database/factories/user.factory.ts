import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { hashSync } from 'bcrypt';

import { User } from '../../clusters/users/user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  protected definition(faker: Faker): EntityData<User> {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName, 'riskchallenger.nl'),
      password: hashSync('Evolution36!', 8),
    };
  }
}
