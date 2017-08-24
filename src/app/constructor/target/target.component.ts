import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

import { Target } from '../../models/target';

@Component({
  selector: '[app-target]',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

  @Input() target: Target;


  constructor(public data: DataService) { }

  selectTarget() {
    this.data.trajectory.setTarget(this.target);
    console.log(this.target);
  }

  ngOnInit() { }
}
