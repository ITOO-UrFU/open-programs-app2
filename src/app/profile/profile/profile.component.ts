import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public person: any;
  public emptyFieldText = 'Не заполнено';
  public userTrajectories: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      data => {
        this.person = data;
        console.log(this.person);
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

    this.profileService.GetUserTrajectories().subscribe(
      data => {
        this.userTrajectories = data;
        console.log("GetUserTrajectories: ", this.userTrajectories);
      },
      error => {
        console.error('Ошибка при получении траекторий');
      }
    );


  }

}
