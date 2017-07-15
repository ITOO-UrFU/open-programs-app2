import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public person: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      data => {
        console.log(data);
        this.person = data;
        console.log(this.person);
      },
      error => {
        console.error('Ошибка при получении данных пользователя');
      });
  }

}
