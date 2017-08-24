import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';
import { DataService } from '../data.service';

// Custom Models
import { Program } from '../../models/program';
import { Trajectory } from '../../models/trajectory';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})

export class ProgramComponent implements OnInit {
  public trajectory: Trajectory;





  public create: boolean;
  // Временные переменные
  public selected: string;
  public build = false;
  public modules: any = {};
  public competences: any = {};
  public steps = {
    modules: false,
    disciplines: false
  };
  public eduLength = [1,2,3,4,5,6,7,8];
  public term = '4 года';
  public presence: string = 'z';
  public technology_type = 'd';

  public stepNext = false;

  public funcLength(val, term) {
    this.eduLength = val;
    this.term = term;
  }

  public setPresence(val){
    this.presence = val;
  }

  public setTechnologyType(val){
    this.technology_type = val;
  }

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               public data: DataService ) { }


  public variantSelected(discipline, variant, semester) {
    if (variant.semester) {
      if (discipline.default_semester[this.term] === semester) {
        if (variant.semester.term === this.term) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else{
      return false
    }
  }

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

  public step() {
    if ( !this.steps.modules && !this.steps.disciplines ) {
      this.steps.modules = !this.steps.modules;
    } else {
      this.steps.modules = !this.steps.modules;
      this.steps.disciplines = !this.steps.disciplines;
    }
    this.saveTrajectory();
  }


  private collectModules(): any {
    let obj = {}
    let array = [];
    for (const group of this.data.program.choice_groups ){
      obj[group.id] = {};
      obj[group.id].default = group.modules.filter(
        (module_id: any) => {
          return this.data.program.modules_by_id[module_id].targets_positions_indexed[this.selected] === 1;
        }
      );
      array = array.concat(obj[group.id].default);
      obj[group.id].variative = group.modules.filter(
        (module_id: any) => {
          return this.data.program.modules_by_id[module_id].targets_positions_indexed[this.selected] === 2;
        }
      );
      obj[group.id].status = ((obj[group.id].variative.length === 0) ? false : true );
      obj[group.id].labor = group.labor;
      obj[group.id].labor_selected = obj[group.id].default.map(
        (modules_id: string) => {
            return this.data.program.modules_by_id[modules_id].get_labor || 0;
        }
      ).reduce (
        (a: number, b: number) => {
            return  a + b;
        }, 0
      );
    }
    
    return { modules: obj, array: array };
  }
  private collectCompetences(array: any[]): any {
    let obj = {};
    for (const competence of this.data.program.competences ){
        obj[competence.id] = array.filter(
          (module_id: any) => {
            return this.data.program.modules_by_id[module_id].competence === competence.id;
          }
        ).map(
          (module_id: any) => {
            return this.data.program.modules_by_id[module_id].get_labor;
          }
        ).reduce (
          (a: number, b: number) => {
              return  a + b;
          }, 0
        );
      }
      return obj;
  }

  private saveTrajectory() {
    const data = {
      selected: {},
      modules: {},
      steps: {}
    };
    data.selected = this.selected;
    data.modules = this.modules;
    data.steps = this.steps;
    this.service.postResponse('save_trajectory', JSON.stringify({ id: this.trajectory.id,
                                                                  program_id:  this.trajectory.program_id,
                                                                  data: data })
                             )
                .subscribe(
                      (trajectory) => {
                         console.log('ok');
                      },
                      error => {
                        console.log(error);
                      });
  }



  public selectTarget(id) {
    this.selected = id;
    this.modules = this.collectModules().modules;
    this.competences = this.collectCompetences(this.collectModules().array);

    this.saveTrajectory();
  }


  public toggle(id: string, group: string, type: string) {
    if (this.modules[group].status) {
      if (type === 'default') {
        this.modules[group].default.splice(this.modules[group].default.indexOf(id), 1);
        this.modules[group].variative.push(id);
      }
      if (type === 'variative') {
        this.modules[group].variative.splice(this.modules[group].variative.indexOf(id), 1);
        this.modules[group].default.push(id);
      }
      this.modules[group].labor_selected = this.modules[group].default.map(
        (module_id: string) => {
            return this.data.program.modules_by_id[module_id].get_labor || 0;
        }
      ).reduce (
        (a: number, b: number) => {
            return  a + b;
        }, 0
      );
    }
    this.saveTrajectory();
  }




  isModulesDone() {
    console.log('1', this.data.trajectory.modules_selected)
    const laborAll = this.data.trajectory.modules_selected.reduce(
      (a, b) => a.concat(b), []
    ).map(
      modules_id => this.data.program.getModule(modules_id).get_labor
    ).reduce(
      (a, b) => a + b, 0
    );

    const laborChoiceGroup = this.data.trajectory.choice_groups.map(
      choice_group_id => this.data.program.getChoiceGroup(choice_group_id).labor
   ).reduce(
      (a, b) => a + b, 0
    );
    return laborChoiceGroup === laborAll;
  }



  ngOnInit() {
    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {
                                  this.data.getProgram( trajectory.program );
                                  this.data.trajectory = new Trajectory( trajectory.id, trajectory.program );
                                }
                              );
  }
}






























