import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [HomePageComponent, SignInPageComponent],
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class PagesModule {}
