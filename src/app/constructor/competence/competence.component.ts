import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

import { Program } from '../../models/program';
import { Trajectory } from '../../models/trajectory';

@Component({
  selector: '[app-competence]',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {
  @Input() competence;
  public trajectory: Trajectory;
  public program: Program;

  constructor( public data: DataService ) { }

  getCompetenceLabor() {
    const labor = this.trajectory.modules.filter(
      module => module.competence === this.competence.id
    ).map(
      module => module.labor
    ).reduce(
      (a, b) => a + b, 0
    );

    const laborAll = this.trajectory.modules.filter(
      module => module.competence
    ).map(
      module => module.labor
    ).reduce(
      (a, b) => a + b, 0
    );
    return Math.round( labor / laborAll * 100 );
  }

  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
  }
}
