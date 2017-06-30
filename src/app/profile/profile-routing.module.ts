import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components


const routes: Routes = [
  {
    // path: 'constructor',
    // component: ProgramListComponent,
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