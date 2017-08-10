import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

import { Trajectory } from '../trajectory';
import { Program } from '../program2';

@Component({
  selector: '[app-discipline-calendar]',
  templateUrl: './discipline-calendar.component.html',
  styleUrls: ['./discipline-calendar.component.scss']
})
export class DisciplineCalendarComponent implements OnInit {
  trajectory: Trajectory;
  program: Program;

  public term = '4 года';
  public presence: string = 'z';
  public technology_type = 'd';

  @Input() semesters: number[];
  @Input() discipline;

  constructor(public data: DataService) { }

    public variantSelected1(discipline, variants, variant, semester){
    if (variants && discipline.default_semester[this.term] === semester) {
      const elements1 = variants.filter((element) => {
        return element.technology;
      })
      const elements2 = elements1.filter((element) => {
        return element.technology.technology_type === this.technology_type;
      })
      const elements3 = elements2.filter((element) => {
        return element.technology.presence === this.presence;
      })
      const elements4 = elements3.filter((element) => {
        return element.semester;
      })
      const elements5 = elements4.filter((element) => {
        return element.semester.term === this.term;
      });
      if (elements5.length){
        return elements5[0].id === variant.id;
      } else if (elements4.length){
        return elements4[0].id === variant.id;
      } else if (elements3.length){
        return elements3[0].id === variant.id;
      } else if (elements2.length){
        return elements2[0].id === variant.id;
      } else if (elements1.length){
        return elements1[0].id === variant.id;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
  }

}
