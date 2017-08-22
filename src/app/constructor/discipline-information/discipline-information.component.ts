import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

// Custom Models
import { Trajectory } from '../../models/trajectory';
import { Program } from '../../models/program';

@Component({
  selector: '[app-discipline-information]',
  templateUrl: './discipline-information.component.html',
  styleUrls: ['./discipline-information.component.scss']
})
export class DisciplineInformationComponent implements OnInit {
  trajectory: Trajectory;
  program: Program;

  @Input() discipline;

  constructor(public data: DataService) { }

  getVariants(){
    console.log(this.discipline.title, this.discipline.default_semester, this.program.variants[this.discipline.id])
  }

  ngOnInit() {
        this.trajectory = this.data.trajectory;
        this.program = this.data.program;
  }

}
