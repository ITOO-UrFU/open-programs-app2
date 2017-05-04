import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { ProgramConstructorLiteComponent } from './program-constructor-lite/program-constructor-lite.component'

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'programs',
    children: [
      {
        path: ':id',
        component: ProgramConstructorLiteComponent,
      }
    ]
  },
  {
    path: ':id',
    component: ContainerComponent,
    children: [
      {
        path: ':id',
        component: ContainerComponent,
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
