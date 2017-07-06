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
  private idleCount = 0;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
  ) {}

  refreshAction() {
      this.authService.refreshToken().subscribe(
                (data) => {
                console.log("токен обновлен");
                },
                (err) => {
                  console.error("токен не обновлен");
                  this.authService.logout();
                });
    }

  activity() {
    this.refreshAction();
    Observable.fromEvent(document, 'click').bufferTime(1000).subscribe((clickBuffer) => {
      console.log(this.idleCount);
        if (clickBuffer.length > 0) {
          this.idleCount = 0;
          this.refreshAction();
        } else {
          this.idleCount++;
        }
        if (this.idleCount > 20) {
          this.authService.logout();
        }

    });
  }

  ngOnInit() {
    console.log("app.component init")
    if (this.authService.getCurrentUser() == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
      this.activity();
    }
    console.log('this.loggedMenu', this.loggedMenu);
    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu)},
                        error => console.log(error));
  }
}