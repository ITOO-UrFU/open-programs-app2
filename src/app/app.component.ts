import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';
import { AuthService } from './auth/auth.service';

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
    private authService: AuthService
  ){}

  ngOnInit(){
    this.isLogged = this.authService.getCurrentUser();
    console.log('this.loggedMenu', this.loggedMenu);
    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu)},
                        error => console.log(error));
  }

}