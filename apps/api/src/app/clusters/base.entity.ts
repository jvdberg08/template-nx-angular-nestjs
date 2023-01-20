import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity as MikroBaseEntity } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity<
  T extends BaseEntity<T>
> extends MikroBaseEntity<T, 'id'> {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({
    nullable: true,
    type: Date,
    onUpdate: () => new Date(),
  })
  updatedAt: Date | null = null;
}
