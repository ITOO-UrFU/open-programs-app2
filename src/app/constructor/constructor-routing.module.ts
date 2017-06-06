import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components

import { ProgramListComponent } from './program-list/program-list.component';

const routes: Routes = [
  {
    path: 'constructor',
    children: [
      {
        path: 'programlist',
        component: ProgramListComponent,
      },
      {
        path: 'program',
        children: [
          {
            path: ':id',
            component: Program,
          }
        ]
      }
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
export class ConstructorRoutingModule { }
