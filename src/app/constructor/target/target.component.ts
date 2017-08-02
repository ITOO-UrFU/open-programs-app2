import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: '[app-target]',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

  @Input() target;

  constructor(public data: DataService) { }

  click(){
    this.data.trajectory.setTarget(this.target.id)
  }

  ngOnInit() {
  }
}