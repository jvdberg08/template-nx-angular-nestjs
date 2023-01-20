import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { Example } from '../../core/state/example/example.model';
import { ExamplesQuery } from '../../core/state/example/examples.query';
import { ExamplesService } from '../../core/state/example/examples.service';

@Component({
  selector: 'ps-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  examples$ = this.examplesQuery.selectAll();
  exampleToUpdate?: Example;

  constructor(
    private readonly examplesQuery: ExamplesQuery,
    private readonly examplesService: ExamplesService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.examplesService.get().subscribe();
  }

  createExample(exampleProperty: string): void {
    this.examplesService.add(new Example({ exampleProperty })).subscribe();
  }

  updateExample(id: number, exampleProperty: string): void {
    this.examplesService
      .update(id, new Example({ exampleProperty }))
      .subscribe();
  }

  deleteExample(example: Example): void {
    if (this.exampleToUpdate?.id === example.id)
      this.exampleToUpdate = undefined;
    this.examplesService.delete(example.id).subscribe();
  }

  async signOut(): Promise<void> {
    await this.router.navigate(['sign-in']);
    this.authService.signOut();
  }
}
