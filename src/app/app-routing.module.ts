import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { ProgramConstructorLiteComponent } from './program-constructor-lite/program-constructor-lite.component';
import { ProgramDisciplinesConstructorComponent } from './program-disciplines-constructor/program-disciplines-constructor.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { AuthGuard } from './auth.guard';

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
    path: 'admin',
    canActivate: [AuthGuard],
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
  }
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuard],
  //   component: AdminPageComponent,
  // }
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
