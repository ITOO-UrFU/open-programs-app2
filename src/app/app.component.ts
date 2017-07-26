import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { AuthService } from './auth/auth.service';
import { LoginPageComponent } from './login-page/login-page.component';



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
  ) {
      this.authService.isLogged.subscribe((mode: boolean) => {
        this.isLogged = mode;
      });
  }

  ngOnInit() {
    if (this.authService.getCurrentUser() == null) {
        this.isLogged = false;
    } else {
        this.isLogged = true;
        this.authService.activity();
    }

    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu)},
                        error => console.log(error));
  }
}