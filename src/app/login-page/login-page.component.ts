import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginModel: any = {};
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

    login() {

        this.authService.login(this.loginModel.email, this.loginModel.password)
            .subscribe(
                data => {
                    this.router.navigate(['admin']);
                },
                error => {
                    console.error('Ошибка при входе. Проверьте правильность введенных данных.');
                });
    }
    refreshToken(){
      this.authService.refreshToken().subscribe(
                data => {
                 //   console.log('Новый токен пришел.', data);
                },
                error => {
                    console.error('Ошибка при обновлении. Проверьте правильность введенных данных.');
                });
    }
}
