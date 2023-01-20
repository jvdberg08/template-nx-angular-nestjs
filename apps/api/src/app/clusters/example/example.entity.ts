import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '../base.entity';
import { ExamplesRepository } from './examples.repository';

@Entity({ customRepository: () => ExamplesRepository })
export class Example extends BaseEntity<Example> {
  @Property()
  exampleProperty!: string;
}
