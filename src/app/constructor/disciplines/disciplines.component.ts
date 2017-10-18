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
  show_variants = false;

  toogle_view(discipline) {
    if (discipline.open == undefined)
    {discipline.open == false}
    discipline.open = !discipline.open;
  }
  toggleAll(){
    var arr = this.getDis();
    console.log(arr)
    for (let el of arr){
      console.log(el.open)
      el.open = false
    }
  }

  constructor(public data: DataService) { }

  getDisciplines(modules) {
    this.disciplines = modules.map(
      module => module.disciplines
    ).reduce(
      (a, b) => a.concat(b), []
    );
  }
  getDis(){
    return this.trajectory.modules.map(
      module => module.disciplines
    ).reduce(
      (a, b) => a.concat(b), []
    );
  }
  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
    this.getDisciplines(this.trajectory.modules);
    if (!this.trajectory.getStatus()) {
// костыль
 this.data.setTechnologyType('', 0)
    }
  }
}

