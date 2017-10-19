import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

// Custom Models
import { Trajectory } from '../../models/trajectory';
import { Program } from '../../models/program';

import {ChartsModule, Color} from 'ng2-charts';

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
  public colorsOverride: Array<Color> = [
  {
    backgroundColor: 'red',
  },
  {
    backgroundColor: '#4be2ea'
  },
  {
    backgroundColor: '#2da910'
  },
  {
    backgroundColor: '#e00c76'
  },
  {
    backgroundColor: '#e0db0c'
  },
  {
    backgroundColor: '#999999'
  },
  {
    backgroundColor: '#69e'
  }
];
  public show_variants = false;

  @Input() discipline;

  constructor(public data: DataService) { }

  getVariants(){
    console.log(this.discipline.title, this.discipline.default_semester, this.program.variants[this.discipline.id])
  }



  getGraphic() {
    if (this.trajectory.getVariantSelected(this.discipline.id)) {
        this.pieChartData['labels'] = [];
        this.pieChartData['datasets'] = [];
        const diagram = this.trajectory.getVariantSelected(this.discipline.id).diagram.diagram;
        if (diagram.length > 0) {
          for (let i = 1; i < 21; i++ ) {
            this.pieChartData['labels'].push('Неделя ' + i);
          }
          let q = diagram.length;
          while (q--) {
            this.pieChartData['datasets'].push({
              label: diagram[q]['wt'],
              stack: 'stack 0',
              data: Object.keys(diagram[q]).map(key => diagram[q][key]).filter(labor => typeof labor === 'number')
            });
          }
        }
          console.log(this.pieChartData)
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
