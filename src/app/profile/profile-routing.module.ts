import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { UserTrajectoriesListComponent } from './user-trajectories-list/user-trajectories-list.component';

import { AuthGuard } from '../auth.guard';

// components
const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {roles: ['admin', 'manager', 'user']},
    children: [
      {
        path: 'edit',
        component: ProfileEditComponent,
      },
      {
        path: 'trajectories',
        component: UserTrajectoriesListComponent,
      },
      // {
      //   path: 'change-password',
      //   component: ProfileEditComponent,
      // }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }