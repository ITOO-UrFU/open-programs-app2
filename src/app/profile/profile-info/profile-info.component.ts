import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: '[app-profile-info]',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  public person: any;
  public emptyFieldText = 'Не заполнено';

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      data => {
        this.person = data;
        // console.log(this.person);
        const sexNames = {
          U: 'Не выбрано',
          M: 'Мужской',
          F: 'Женский'
        };
        this.person.sex = sexNames[this.person.sex];
      },
      error => {
        console.error('Ошибка при получении данных пользователя');
      });
  }

}
