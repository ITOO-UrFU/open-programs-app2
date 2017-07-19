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
  public allPrograms: any;

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
      trajectory => {
        this.userTrajectories = trajectory;

        this.profileService.GetPrograms().subscribe(
          programs => {
            this.allPrograms = programs;

            for (let trajectory of this.userTrajectories){
              for (let program of this.allPrograms){
                if (program.id == trajectory.program){
                  trajectory.title = program.title;
                }
              }
            }

            console.log(this.userTrajectories);

          },
          programs_error => {
            console.error('Ошибка при получении программ');
          }
        );



      },
      trajectory_error => {
        console.error('Ошибка при получении траекторий');
      }
    );



    


  }

}
