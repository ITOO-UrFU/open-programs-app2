import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

import { Target } from '../../models/target';
import { Trajectory } from '../../models/trajectory';

@Component({
  selector: '[app-target]',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  public trajectory: Trajectory;

  @Input() target: Target;


  constructor(public data: DataService) { }

  selectTarget() {
    this.trajectory.setTarget(this.target);
    this.data.func();
  }

  ngOnInit() {
    this.trajectory = this.data.trajectory;
   }
}
