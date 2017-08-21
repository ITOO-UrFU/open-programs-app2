import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

import { Trajectory } from '../trajectory';
import { Program } from '../../models/program';

@Component({
  selector: '[app-discipline-calendar]',
  templateUrl: './discipline-calendar.component.html',
  styleUrls: ['./discipline-calendar.component.scss']
})
export class DisciplineCalendarComponent implements OnInit {
  trajectory: Trajectory;
  program: Program;
  variants: any[];


  @Input() discipline;

  constructor(public data: DataService) { }


  public selectDefault(discipline, variants, variant, semester) {

    function compareValues(key, order) {
      return function(a, b) {
        const varA = a.technology[key];
        const varB = b.technology[key];

        if (order === '50') {
          let comparison = 0;
          if (Math.abs(varA - 50) > Math.abs(varB - 50)) {
            comparison = 1;
          } else if (Math.abs(varA - 50) < Math.abs(varB - 50)) {
            comparison = -1;
          }
        } else {

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'htl') ? (comparison * -1) : comparison
          );
        }
      };
    }
    if (variants) {
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
        elements.sort(compareValues("campus", "50"))
        //console.log('Campus', elements)
      }
      const campus_elements = elements.filter(
        (element) => {
          if (this.data.campus !== 50 && element.technology.campus === 100 - this.data.campus) {
            return false;
          } else if (this.data.campus === 50) {
            return element.technology.campus === 0;
          } else {return true; }
        }
      );
      if (campus_elements.length) {
        elements = campus_elements;
      }
      //console.log('Campus2', elements, campus_elements)

      if (this.data.sync === 0) {
        elements.sort(compareValues("sync", "lth"))
      } else if ( this.data.sync === 100 ) {
        elements.sort(compareValues("sync", "htl"))
      } else {
        elements.sort(compareValues("sync", "50"))
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

  public variantSelected( discipline, variants, variant, semester ) {
    if ( variants ) {
      let elements = variants.filter(
        (element) => {
          if ( element.mobility > 0 ) {
            return true;
          } else if ( element.mobility === 0 ) {
            return element.semester.term === this.data.term;
          }
        }
      );
      elements = elements.filter(
          (element) => {
            if ( element.campus === this.data.campus && element.sync === this.data.sync ) {
              return true;
            } else if ( element.campus === this.data.campus ) {
              return true;
            } else if ( element.sync === this.data.sync  ) {
              return true;
            } else {
              return true;
            }
          }
        );
      elements = elements.sort(
        (a, b) => {
          if ( this.data.campus === 0 && this.data.sync === 0) {
            if (a.campus > b.campus) {
              return 1;
            } else if (a.campus < b.campus){
              return -1;
            } else {
              return 0;
            }
          }
        }
      );
      //console.log('1111', elements.map((element) => element.campus))
      if (elements.length) {
        return elements[0].id === variant.id;
      } else {
        return false;
      };

      // if (elements.length) {
      //   return elements[0].id === variant.id;
      // } else {
      //   elements = variants.filter((element) => {
      //     if ( element.technology && element.technology.presence === this.data.presence ) {
      //       if ( element.semester && element.semester.term === this.data.term ) {
      //         return true;
      //       }
      //     }
      //   });
      //   if (elements.length){
      //     return elements[0].id === variant.id;
      //   } else {
      //     elements = variants.filter((element) => {
      //     if ( element.technology && element.technology.presence === this.data.presence ) {
      //         return true;
      //     }
      //   });
      //   if (elements.length){
      //     return elements[0].id === variant.id;
      //   } else {
      //     return false;
      //   }
      // }
    }
  }

  public variantSelected1(discipline, variants, variant, semester){
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
    this.variants = this.program.variants[this.discipline.id];
    console.log(this.discipline.title+':', this.variants.map((element) =>{ return {m: element.mobility, c: element.campus, s: element.sync} }))
    this.variants = this.variants.sort(
      (a, b) => {
        const am = Number(a.mobility);
        const bm = Number(b.mobility);
        const ac = Number(a.campus);
        const bc = Number(b.campus);
        const as = Number(a.sync);
        const bs = Number(b.sync);
        //console.log(this.discipline.title+': mobility: ' + am +' , '+ bm + ' | campus: ' + ac +' , '+ bc + ' | sync: ' + as +' , '+ bs , Number(am < bm) - Number(am > bm) || Number(ac < bc) - Number(ac > bc) || Number(as < bs) - Number(as > bs) );
        //return  Number(am < bm) - Number(am > bm) || Number(ac < bc) - Number(ac > bc) || Number(asy < bsy) - Number(asy > bsy);
        if ( this.data.campus === 100 && this.data.sync === 100 ) {
          return bm - am || bc - ac  || bs - as;
        } else if (this.data.campus === 100 && this.data.sync < 100) {
          return bm - am || bc - ac  || -1 * (bs - as);
        } else if ( this.data.campus < 100 && this.data.sync < 100 ) {
          return bm - am || -1 * (bc - ac)  || -1 * (bs - as);
        }
      }
    );
    console.log(this.discipline.title+':', this.variants.map((element) => { return {m: element.mobility, c: element.campus, s: element.sync} }))

    this.data.changesSubject.subscribe((val) => {
      console.log(val)
      this.variants = this.variants.sort(
        (a, b) => {
          const am = Number(a.mobility);
          const bm = Number(b.mobility);
          const ac = Number(a.campus);
          const bc = Number(b.campus);
          const as = Number(a.sync);
          const bs = Number(b.sync);
          //console.log(this.discipline.title+': mobility: ' + am +' , '+ bm + ' | campus: ' + ac +' , '+ bc + ' | sync: ' + as +' , '+ bs , Number(am < bm) - Number(am > bm) || Number(ac < bc) - Number(ac > bc) || Number(as < bs) - Number(as > bs) );
          //return  Number(am < bm) - Number(am > bm) || Number(ac < bc) - Number(ac > bc) || Number(asy < bsy) - Number(asy > bsy);
          if ( this.data.campus === 100 && this.data.sync === 100 ) {
            return bm - am || bc - ac  || bs - as;
          } else if (this.data.campus === 100 && this.data.sync > 100) {
            return bm - am || bc - ac  || -1 * (bs - as);
          } else if ( this.data.campus > 100 && this.data.sync > 100 ) {
            return bm - am || -1 * (bc - ac)  || -1 * (bs - as);
          }
        }
      );
      console.log(this.discipline.title+':', this.variants.map((element) => { return {m: element.mobility, c: element.campus, s: element.sync} }))
    });
  }
}