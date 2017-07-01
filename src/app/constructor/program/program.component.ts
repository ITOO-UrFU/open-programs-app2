import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';
import { DataService } from '../data.service';
// import { DisciplineComponent } from '../discipline/discipline.component'

import { Program } from '../program';
import { Trajectory } from '../trajectory';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})

export class ProgramComponent implements OnInit {
  public program: Program;
  public trajectory: Trajectory;
  public create: boolean;
  // Временные переменные
  public selected: string;
  public build = false;
  public modules = {};
  public competences = {};
  public steps: number;


  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               private data: DataService ) { }


  public getProgram( program_id: string ) {
    this.service.getElementsBySlug( 'programs', program_id )
                .subscribe(
                  (program: any) => {
                    this.program = new Program( program.id,
                                                program.title,
                                                program.training_direction,
                                                program.get_level_display,
                                                program.get_competences_diagram,
                                                program.get_choice_groups,
                                                program.chief,
                                                program.competences );
                    this.titleService.setTitle(this.program.title);
                    this.getTargets(program_id);
                    this.getCompetences(program_id);
                    this.getChoiceGroups(program_id);
                    this.getModules(program_id);
                    this.buildTrajectory();
                  },
                  (error) => { console.log('Ошибка получения программы. API: /programs', error); }
                );
  }
  public getTargets( program_id: string ) {
    this.service.getElementsBySlug('get_program_targets', program_id)
                .subscribe(
                  (targets: any) => {
                    this.program.getTargets(targets);

                    if(!this.selected){
                      this.selected = targets[0].id
                    };

                    this.buildTrajectory();
                  },
                  (error) => { console.log('Ошибка получения целей программы. API: /get_program_targets', error); }
                );
  }

  public getChoiceGroups( program_id: string ) {
    this.service.getElementsBySlug('get_program_choice_groups', program_id)
                .subscribe(
                  (choiceGroups: any) => {
                    this.program.getChoicGroup(choiceGroups);
                    this.buildTrajectory();
                  },
                  (error) => { console.error('Ошибка получения групп выбора. API: /get_program_choice_groups', error); }
                );
  }

  public getModules( program_id: string ) {
    this.service.getElementsBySlug('get_program_modules', program_id)
                .subscribe(
                  (modules: any) => {
                    this.program.getModules(modules);
                    this.buildTrajectory();
                  },
                  (error) => { console.error('Ошибка получения модулей программы. API: /get_program_modules', error); }
                );
  }

  public getCompetences( program_id: string ) {
    this.service.getElementsBySlug('get_program_competences', program_id)
                .subscribe(
                  (competences: any) => {
                    this.program.getCompetences(competences);
                    this.buildTrajectory();
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_competences', error); }
                );
  }
  private collectModules(): any {
    let obj = {}
    let array = [];
    for (const group of this.program.choice_groups ){
      obj[group.id] = {};
      obj[group.id].default = group.get_program_modules.filter(
        (module_id: any) => {
          return this.program.modules_by_id[module_id].targets_positions_indexed[this.selected] === 1;
        }
      );
      array = array.concat(obj[group.id].default);
      obj[group.id].variative = group.get_program_modules.filter(
        (module_id: any) => {
          return this.program.modules_by_id[module_id].targets_positions_indexed[this.selected] === 2;
        }
      );
      obj[group.id].status = ((obj[group.id].variative.length === 0) ? false : true );
      obj[group.id].labor = group.labor;
      obj[group.id].labor_selected = obj[group.id].default.map(
        (modules_id: string) => {
            return this.program.modules_by_id[modules_id].get_labor || 0;
        }
      ).reduce (
        (a: number, b: number) => {
            return  a + b;
        }, 0
      );
    }
    console.log({ modules: obj, array: array })
    return { modules: obj, array: array };
  }
  private collectCompetences(array: any[]): any {
    let obj = {};
    for (const competence of this.program.competences ){
        obj[competence.id] = array.filter(
          (module_id: any) => {
            return this.program.modules_by_id[module_id].competence === competence.id;
          }
        ).map(
          (module_id: any) => {
            return this.program.modules_by_id[module_id].get_labor;
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
      modules: {}
    };
    data.selected = this.selected;
    data.modules = this.modules;
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
  public buildTrajectory() {
    if ( this.program.complete_load().indexOf(false) === -1) {
      this.competences = this.collectCompetences(this.collectModules().array);
      if (this.modules) {
        this.modules = this.collectModules().modules;
      }
      this.build = true;
      this.saveTrajectory();
      console.log('build')
      console.log(this.competences);
      console.log(this.modules);
    } else {
      console.log('nea!');
    }
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
            return this.program.modules_by_id[module_id].get_labor || 0;
        }
      ).reduce (
        (a: number, b: number) => {
            return  a + b;
        }, 0
      );
    }
    this.saveTrajectory();
  }

  ngOnInit() {
    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {
                                  this.trajectory = new Trajectory( trajectory.id, trajectory.program );
                                  if ( trajectory.data ) {
                                    this.selected = trajectory.data.selected;
                                    this.modules = trajectory.data.modules;
                                  }
                                  this.getProgram(trajectory.program);
                                }
                              );
  }
}
