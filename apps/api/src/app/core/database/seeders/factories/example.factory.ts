import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';

import { Example } from '../../../../clusters/example/example.entity';

export class ExampleFactory extends Factory<Example> {
  model = Example;

  protected definition(faker: Faker): EntityData<Example> {
    return {
      exampleProperty: faker.random.word(),
    };
  }
}
