import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: '[app-competence]',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {
  @Input() public competence;

  constructor( public data: DataService ) { }

  getCompetenceLabor() {
    const labor = this.data.trajectory.modules_selected.reduce(
      (a, b) => a.concat(b), []
    ).map(
      modules_id => this.data.program.getModule(modules_id)
    ).filter(
      module => module.competence === this.competence.id
    ).map(
      module => module.get_labor
    ).reduce(
      (a, b) => a + b, 0
    );

    const laborAll = this.data.trajectory.modules_selected.reduce(
      (a, b) => a.concat(b), []
    ).map(
      modules_id => this.data.program.getModule(modules_id)
    ).filter(
      module => module.competence
    ).map(
      module => module.get_labor
    ).reduce(
      (a, b) => a + b, 0
    );
    return Math.round( labor / laborAll * 100 );
  }

  ngOnInit() {
  }
}
