import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from '../login-page/login-page.component';
import { AuthService } from '../auth/auth.service';
// import { RegisterService } from '../register-page/register.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule,
  ],
  providers: [
    AuthService
  ],
  declarations: [
    LoginPageComponent,
  ]
})
export class AuthModule { }