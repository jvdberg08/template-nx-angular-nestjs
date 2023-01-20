import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ExamplesState, ExamplesStore } from './examples.store';

@Injectable({ providedIn: 'root' })
export class ExamplesQuery extends QueryEntity<ExamplesState> {
  constructor(store: ExamplesStore) {
    super(store);
  }
}
