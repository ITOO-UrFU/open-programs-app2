import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

// Custom Models
import { Trajectory } from '../../models/trajectory';
import { Program } from '../../models/program';

@Component({
  selector: '[app-disciplines]',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  trajectory: Trajectory;
  program: Program;
  disciplines: any[];
  
  constructor(public data: DataService) { }

  getDisciplines(){
    this.disciplines = this.trajectory.modules.map(
      module => module.disciplines
    ).reduce(
      (a,b) => a.concat(b), []
    );
    console.log('!!!', this.disciplines)
  }
  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
    this.getDisciplines();
  }
}
