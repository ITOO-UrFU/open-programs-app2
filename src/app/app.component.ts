import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';
import { AuthService } from './auth/auth.service';
import { LoginPageComponent } from './login-page/login-page.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/bufferTime';

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
    private authService: AuthService,
  ) {}

  activity() {
        console.log(document);
        Observable.fromEvent(document, 'click').bufferTime(60000).subscribe((clickBuffer) => {
            if (clickBuffer.length > 0) {
                this.authService.refreshToken();
              }
        });
    }

  ngOnInit() {
    this.isLogged = this.authService.getCurrentUser();
    console.log('this.loggedMenu', this.loggedMenu);
    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu)},
                        error => console.log(error));
    this.activity();
  }
}