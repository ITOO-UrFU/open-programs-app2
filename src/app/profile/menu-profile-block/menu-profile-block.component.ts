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
     this.authService.logged.subscribe((mode: boolean) => {
        this.setProfileInfo();
      });
  }

  ngOnInit() {
    console.log('Инициализировал блок профиля в меню');
    this.setProfileInfo();
  }

  setProfileInfo(){
  this.profileService.getProfile().subscribe(
        data => {
          this.person = data;
          this.person.profile_photo = 'http://barbershop-man.ru/wp-content/uploads/icon-man-3.png';
        },
        error => {
          console.error('Ошибка при получении данных пользователя');
        });
  }
  

}
