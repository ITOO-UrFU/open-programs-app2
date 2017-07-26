import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-user-trajectory-block]',
  templateUrl: './user-trajectory-block.component.html',
  styleUrls: ['./user-trajectory-block.component.scss']
})
export class UserTrajectoryBlockComponent implements OnInit {

@Input() trajectory: any = [];

  constructor() { }

  ngOnInit() {
  }

}
