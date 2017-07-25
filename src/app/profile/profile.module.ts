import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

import { ProfileService } from './profile.service';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserTrajectoriesListComponent } from './user-trajectories-list/user-trajectories-list.component';
import { UserTrajectoryBlockComponent } from './user-trajectory-block/user-trajectory-block.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ChangePasswordComponent } from './profile-edit/change-password/change-password.component';

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
    UserTrajectoriesListComponent,
    UserTrajectoryBlockComponent,
    ProfileEditComponent,
    ProfileInfoComponent,
    ChangePasswordComponent,
  ]
})
export class ProfileModule { }