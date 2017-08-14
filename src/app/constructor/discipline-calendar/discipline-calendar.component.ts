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


  public selectDefault(discipline, variants, variant, semester) {
    if (variants && discipline.default_semester[this.data.term] === semester) {
      let elements = variants.filter(
        (element) => {
          if (element.technology && element.technology.mobility > 0) {
            return true;
          } else if (element.technology && element.technology.mobility === 0) {
            return element.semester.term === this.data.term;
          }
        }
      )
    }
  }

  public variantSelected(discipline, variants, variant, semester){
    if (variants && discipline.default_semester[this.data.term] === semester) {
      let elements = variants.filter((element) => {
        if ( element.technology && element.technology.presence === 'online' && this.data.technology_type === 'd'){
          if ( element.technology.technology_type === this.data.technology_type ) {
            return true;
          }
        } else if ( element.technology && element.technology.presence === this.data.presence ) {
          if ( element.technology.technology_type === this.data.technology_type ) {
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
          if ( element.technology && element.technology.presence === this.data.presence ) {
            if ( element.semester && element.semester.term === this.data.term ) {
              return true;
            }
          }
        });
        if (elements.length){
          return elements[0].id === variant.id;
        } else {
          elements = variants.filter((element) => {
          if ( element.technology && element.technology.presence === this.data.presence ) {
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
