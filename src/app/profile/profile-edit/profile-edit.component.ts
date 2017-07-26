import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  public person: any = {};
  public model: any = {};

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      data => {
        this.person = data;
        this.model = this.person;
        console.log(this.person);
      },
      error => {
        console.error('Ошибка при получении данных пользователя');
      });
  }
  update() {
    this.profileService.updateProfile(this.model)
      .subscribe(
      data => {
        console.log('Профиль успешно обновлен');
        alert('Профиль успешно обновлен');
        this.authService.isLogged.emit(true);
      },
      error => {
        console.error('Ошибка при обновлении профиля пользователя');
      });
  }

}
