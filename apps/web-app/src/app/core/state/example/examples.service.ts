import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

import { ExamplesState, ExamplesStore } from './examples.store';

@Injectable({ providedIn: 'root' })
export class ExamplesService extends NgEntityService<ExamplesState> {
  constructor(store: ExamplesStore) {
    super(store);
  }
}
