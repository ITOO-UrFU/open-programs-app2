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

  public pieChartType = 'bar';
  public pieChartLabels: string[] = [];
  public pieChartData: any = {};
  public show_variants = false;

  @Input() discipline;

  constructor(public data: DataService) { }

  getVariants(){
    console.log(this.discipline.title, this.discipline.default_semester, this.program.variants[this.discipline.id])
  }

  toogle_view() {
    this.show_variants = !this.show_variants;
  }

  getGraphic() {
    if (this.trajectory.getVariantSelected(this.discipline.id)) {
        this.pieChartData['labels'] = [];
        this.pieChartData['datasets'] = [];
        const diagram = this.trajectory.getVariantSelected(this.discipline.id).diagram.diagram;
        console.log("diagram", this.trajectory.getVariantSelected(this.discipline.id));
        if (diagram.length > 0) {
          for (let i = 1; i < 21; i++ ) {
            this.pieChartData['labels'].push('Неделя ' + i);
          }
          for (let q = 0; q < diagram.length; q++) {
            this.pieChartData['datasets'].push({
              'label': diagram[q]['wt'],
              'stack': 'stack 0',
              'data': Object.keys(diagram[q]).map(key => diagram[q][key]).filter(labor => typeof labor === 'number')
            });
          }
        }
          return this.pieChartData;
        } else {
          return false;
        }
  }
  ngOnInit() {
        this.trajectory = this.data.trajectory;
        this.program = this.data.program;

  }

}
