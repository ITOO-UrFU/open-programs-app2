import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../auth.guard';

// components
const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {roles: ['admin', 'manager', 'user']}
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