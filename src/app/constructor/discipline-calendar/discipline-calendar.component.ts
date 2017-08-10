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

  @Input() discipline;

  constructor(public data: DataService) { }


    public variantSelected1(discipline, variants, variant, semester){
    if (variants && discipline.default_semester[this.data.term] === semester) {
      const elements1 = variants.filter((element) => {
        return element.technology;
      })
      const elements2 = elements1.filter((element) => {
        return element.technology.technology_type === this.data.technology_type;
      })
      const elements3 = elements2.filter((element) => {
        return element.technology.presence === this.data.presence;
      })
      const elements4 = elements3.filter((element) => {
        return element.semester;
      })
      const elements5 = elements4.filter((element) => {
        return element.semester.term === this.data.term;
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

  public variantSelected(discipline, variants, variant, semester){
    if (variants && discipline.default_semester[this.data.term] === semester) {
      let elements = variants.filter((element) => {
        if ( element.technology && element.technology.technology_type === this.data.technology_type ) {
          if ( element.technology.presence === this.data.presence ) {
            if ( element.semester && element.semester.term === this.data.term ) {
              return true;
            }
          }
        }
      });
      if (elements.length){
        return elements[0].id === variant.id;
      } else {
        elements = variants.filter((element) => {
          if ( element.technology && element.technology.technology_type === this.data.technology_type ) {
            if ( element.semester && element.semester.term === this.data.term ) {
              return true;
            }
          }
        });
        if (elements.length){
          return elements[0].id === variant.id;
        } else {
          elements = variants.filter((element) => {
          if ( element.technology && element.technology.technology_type === this.data.technology_type ) {
              return true;
          }
        });
        if (elements.length){
          return elements[0].id === variant.id;
        } else {
          return false;
        }
      }
      }
    } else {return false;}
  }



  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
  }

}
