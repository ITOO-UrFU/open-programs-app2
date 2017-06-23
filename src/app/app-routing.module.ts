import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { ProgramConstructorLiteComponent } from './program-constructor-lite/program-constructor-lite.component';
import { ProgramDisciplinesConstructorComponent } from './program-disciplines-constructor/program-disciplines-constructor.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

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
    path: 'discipline',
    children: [
      {
        path: ':id',
        component: ProgramDisciplinesConstructorComponent,
      }
    ]
  },
   {
    path: 'constructor',
    children: []
  },
  {
    path: 'open_programs',
    component: ContainerComponent,
    children: [
      {
        path: ':id',
        component: ContainerComponent,
      }
    ]
  },
  {
    path: 'menu',
    component: ContainerComponent,
    children: [
      {
        path: ':id',
        component: ContainerComponent,
      }
    ]
  },
  {
    path: 'programlist',
    redirectTo: 'constructor/programlist'
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  // {
  //   path: ':id',
  //   component: ContainerComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: ContainerComponent,
  //     }
  //   ]
  // }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
