import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'ps-home-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  signInForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.signInForm.valid) {
      this.authService
        .signIn(
          this.signInForm.getRawValue().email,
          this.signInForm.getRawValue().password
        )
        .subscribe(() => void this.router.navigate(['']));
    }
  }
}
