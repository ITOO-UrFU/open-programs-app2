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

    function compareValues(key, order) {
      return function(a, b) {
        const varA = a.technology[key];
        const varB = b.technology[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'htl') ? (comparison * -1) : comparison
        );
      };
    }

    if (variants && discipline.default_semester[this.data.term] === semester) {
      let elements = variants.filter(
        (element) => {
          if (element.technology && element.technology.mobility > 0) {
            return true;
          } else if (element.technology && element.technology.mobility === 0) {
            return element.semester.term === this.data.term;
          }
        }
      );
      if (this.data.campus === 0) {
        elements.sort(compareValues("campus", "lth"))
      } else if ( this.data.campus === 100 ) {
        elements.sort(compareValues("campus", "htl"))
      } else {
        elements.sort(compareValues("campus", "lth"))
      }
      const campus_elements = elements.filter(
        (element) => {
          if (this.data.campus !== 50 && element.technology.campus === 100 - this.data.campus) {
            return false;
          } else {return true; }
        }
      );
      if (campus_elements.length) {
        elements = campus_elements;
      }

      if (this.data.sync === 0) {
        elements.sort(compareValues("sync", "lth"))
      } else if ( this.data.sync === 100 ) {
        elements.sort(compareValues("sync", "htl"))
      } else {
        elements.sort(compareValues("sync", "lth"))
      }
      const sync_elements = elements.filter(
        (element) => {
          if (this.data.sync !== 50 && element.technology.sync === 100 - this.data.sync) {
            return false;
          } else {return true; }
        }
      );
      if (sync_elements.length) {
        return sync_elements[0].id === variant.id;
      } else {
        if (elements.length) {
          return elements[0].id === variant.id;
        } else {
          return variants[0].id === variant.id;
        }
        }
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
      if (elements.length) {
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
