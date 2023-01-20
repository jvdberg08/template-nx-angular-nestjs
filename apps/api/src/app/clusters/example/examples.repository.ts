import { EntityRepository } from '@mikro-orm/core';

import { Example } from './example.entity';

export class ExamplesRepository extends EntityRepository<Example> {}
