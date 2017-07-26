import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginModel: any = {};
  private subscription: Subscription;
  public errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute,

  ) {
    this.subscription = activateRoute.url.subscribe(
      params => {
        if (params[0].path === 'logout') {
          authService.logout();
        }
        if (params[0].path === 'login' && authService.getCurrentUser()) {
          this.router.navigate(['profile']);
        }
      },
      error => this.errorMessage = 'Неверный адрес!'
    );
  }


  ngOnDestroy() {
    this.errorMessage = '';
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }

  login() {

    this.authService.login(this.loginModel.email, this.loginModel.password)
      .subscribe(
      data => {
        // console.log("Вы точно авторизованы");

        this.router.navigate(['profile']);
      },
      error => {
        console.error('Ошибка при входе. Проверьте правильность введенных данных.');
      });
  }

}
