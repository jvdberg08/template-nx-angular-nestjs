import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { plainToClass } from 'class-transformer';

import { Example } from './example.model';

export interface ExamplesState
  extends EntityState<Example, Example['id']>,
    ActiveState {}

const initialState = {};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'examples' })
export class ExamplesStore extends EntityStore<ExamplesState> {
  constructor() {
    super(initialState);
  }

  override akitaPreAddEntity(newEntity: Example): Example {
    return new Example(plainToClass(Example, newEntity));
  }

  override akitaPreUpdateEntity(
    _: Readonly<Example>,
    nextEntity: Example
  ): Example {
    return new Example(plainToClass(Example, nextEntity));
  }
}
