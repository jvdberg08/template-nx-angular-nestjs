import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '../base.entity';
import { UsersRepository } from './users.repository';

@Entity({ customRepository: () => UsersRepository })
export class User extends BaseEntity<User> {
  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  name!: string;
}
