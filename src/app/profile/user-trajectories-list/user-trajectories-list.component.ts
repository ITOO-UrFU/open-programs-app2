import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: '[app-user-trajectories-list]',
  templateUrl: './user-trajectories-list.component.html',
  styleUrls: ['./user-trajectories-list.component.scss']
})
export class UserTrajectoriesListComponent implements OnInit {

  public userTrajectories: any = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserTrajectories();
  }

  public getUserTrajectories() {
    this.profileService.GetUserTrajectories().subscribe(
      trajectories => {
        this.userTrajectories = trajectories;
        // console.log("Список траекторий пользователя: ", this.userTrajectories);
      },
      trajectory_error => {
        console.error('Ошибка при получении траекторий');
      }
    );
  }

  removeTrajectory(trajectory: any) {
    // if (confirm('Удалить траекторию пограммы "' + trajectory.program_name + '" ?')) {
      const trajectory_id = trajectory.id;
      this.profileService.removeTrajectory(trajectory_id)
        .subscribe(
        data => {
          console.log('Траектория "' + trajectory.program_name + '" успешно удалена');
          this.userTrajectories = this.userTrajectories.filter(function (traj) { return traj.id !== trajectory_id; });
        },
        error => {
          console.error('Ошибка при удалении траектории');
        });
    // } else {
    //   // отказались от удаления траектории
    // }
  }

  copyTrajectory(trajectory: any) {
      const trajectory_id = trajectory.id;
      this.profileService.copyTrajectory(trajectory_id)
        .subscribe(
        data => {
          console.log('Траектория "' + trajectory.program_name + '" успешно скопирована');
          this.userTrajectories.push(data.json());
        },
        error => {
          console.error('Ошибка при копировании траектории');
        });
  }

}
