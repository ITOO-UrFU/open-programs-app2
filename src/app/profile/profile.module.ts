import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

import { ProfileService } from './profile.service';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    ProfileRoutingModule,
  ],
  providers: [

  ],
  declarations: [
    ProfileComponent,
  ]
})
export class ProfileModule { }