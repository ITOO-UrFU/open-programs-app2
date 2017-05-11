import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { ProgramConstructorLiteComponent } from './program-constructor-lite/program-constructor-lite.component';
import { ProgramDisciplinesConstructorComponent } from './program-disciplines-constructor/program-disciplines-constructor.component'

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
    path:'discipline',
    children: [
      {
        path: ':id',
        component: ProgramDisciplinesConstructorComponent,
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
