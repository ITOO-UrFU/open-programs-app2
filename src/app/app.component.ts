import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';
import { LoginService } from './login-page/login.service';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  public menu: any[]; // TODO: Написать класс который будет описывать элемент массива
  public loggedMenu: any = {};
  public isLogged = false;

  constructor(
    private globalService: GlobalService,
    private loginService: LoginService
  ){}

  ngOnInit(){
    if(this.loginService.getCurrentUser()){
      this.loggedMenu.title = 'Выход';
      this.loggedMenu.slug = 'logout';
    }
    else{
      this.loggedMenu.title = 'Вход';
      this.loggedMenu.slug = 'login';
    }
    console.log('this.loggedMenu', this.loggedMenu);
    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu)},
                        error => console.log(error));
  }

}