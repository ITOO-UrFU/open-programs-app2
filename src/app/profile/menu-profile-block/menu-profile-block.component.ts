import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu-profile-block',
  templateUrl: './menu-profile-block.component.html',
  styleUrls: ['./menu-profile-block.component.scss']
})
export class MenuProfileBlockComponent implements OnInit {

  public person: any;
  public emptyFieldText = 'Не заполнено';


  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {
    this.authService.isLogged.subscribe((mode: boolean) => {
      if (mode) {
        this.setProfileInfo();
      }
    });
  }

  ngOnInit() {
    // console.log('Инициализировал блок профиля в меню');
    this.setProfileInfo();
  }

  setProfileInfo() {
    this.profileService.getProfile().subscribe(
      data => {
        this.person = data;
        this.person.profile_photo = 'https://openedu.urfu.ru/files/icons8-Cat Profile-96.png';
      },
      error => {
        console.error('Ошибка при получении данных пользователя');
      });
  }

}
