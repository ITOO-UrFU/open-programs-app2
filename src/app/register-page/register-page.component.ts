import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerModel: any = {};
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
  }

  register() {
    this.authService.register(this.registerModel)
        .subscribe(
            data => {
              this.authService.login(this.registerModel.email, this.registerModel.password1).subscribe(data => {
                this.router.navigate(['profile']);
              }, error => {});
            },
            error => {
                console.error("Ошибка при регистрации. Проверьте правильность введенных данных.");
            });
  }

}
