import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: '.app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

changePassword(){
    this.profileService.changePassword(this.model)
      .subscribe(
      data => {
        console.log('Пароль успешно изменен');
      },
      error => {
        console.error('Ошибка при изменении пароля');
      });
}

}
