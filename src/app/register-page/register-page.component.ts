import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { LoginService } from '../login-page/login.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerModel: any = {};
  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
  ) { }


  ngOnInit() {
  }

  register() {
    this.registerService.create(this.registerModel)
        .subscribe(
            data => {
              this.loginService.login(this.registerModel.email, this.registerModel.password1).subscribe(data => {}, error => {});
            },
            error => {
                console.error("Ошибка при регистрации. Проверьте правильность введенных данных.");
            });
  }

}
