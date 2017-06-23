import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginModel: any = {};
  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

    login() {

        this.loginService.login(this.loginModel.email, this.loginModel.password)
            .subscribe(
                data => {
                    // window.location.reload();
                    console.log(data);
                },
                error => {
                    console.error('Ошибка при входе. Проверьте правильность введенных данных.');
                });
    }
}
