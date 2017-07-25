import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public person: any;
  public isEditing: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  toggleEditing(){
    this.isEditing = !this.isEditing;
  }

}
