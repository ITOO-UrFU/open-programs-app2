import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

// Custom Models
import { Trajectory } from '../../models/trajectory';
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
  variants_other: any[];


  @Input() discipline;

  constructor(public data: DataService) { }

  public sortVariants(variants) {
    return variants.sort(
      (a, b) => {
        const am = Number(a.mobility);
        const bm = Number(b.mobility);
        const ac = Number(a.campus);
        const bc = Number(b.campus);
        const as = Number(a.sync);
        const bs = Number(b.sync);
        if (this.data.campus === 100 && this.data.sync === 100) {
          return  bc - ac || bs - as;
        } else if (this.data.campus === 100 && this.data.sync < 100) {
          return  bc - ac || -1 * (bs - as);
        } else if (this.data.campus < 100 && this.data.sync === 100) {
          return  -1 * (bc - ac) || bs - as;
        } else if (this.data.campus < 100 && this.data.sync < 100) {
          return  -1 * (bc - ac) || -1 * (bs - as);
        }
      }
    );
  }

  changeVariantSelected(variant_id) {
    this.trajectory.setVariantSelected(this.discipline.id, variant_id);
  }

  ngOnInit() {
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
    this.variants = this.program.variants[this.discipline.id];
    //console.log(":", this.variants.map((element) => { return { c: element.campus, s: element.sync } }));
    this.variants_other = this.sortVariants(this.program.variants[this.discipline.id].filter((element) => { return element.mobility === 0 && element.semester.term !== this.data.term }));
    this.variants = this.sortVariants(this.program.variants[this.discipline.id].filter((element) => { return element.mobility > 0 || element.mobility === 0 && element.semester.term === this.data.term }));
    if (this.variants.length){
      this.trajectory.setVariantSelected(this.discipline.id, this.variants[0].id);
    }

    this.data.sortSubject.subscribe((val) => {
      //console.log(':', this.variants.map((element) => { return {  c: element.campus, s: element.sync } }));
      this.variants_other = this.sortVariants(this.program.variants[this.discipline.id].filter((element) => { return element.mobility === 0 && element.semester.term !== this.data.term }));
      this.variants = this.sortVariants(this.program.variants[this.discipline.id].filter((element) => { return element.mobility > 0 || element.mobility === 0 && element.semester.term === this.data.term }));
      if (this.variants.length){
        this.trajectory.setVariantSelected(this.discipline.id, this.variants[0].id);
      }

    });

  }

}