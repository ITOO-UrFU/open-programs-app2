// Angular 2
import { Injectable } from '@angular/core';

// Class

import { Target } from '../models/target';
import { Program } from '../models/program';
import { Trajectory } from '../models/trajectory';

// Services
import {ConstructorService} from './constructor.service';

// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ReplaySubject} from 'rxjs/ReplaySubject';

// Variables


@Injectable()
export class DataService {
  program: Program;
  trajectory: Trajectory;
  choice_groups_status = {};

  sortSubject: ReplaySubject<any> = new ReplaySubject();
  loadSubject: ReplaySubject<any> = new ReplaySubject();
// old
  targets = false;
  competences = false;
  choice_groups = false;
  modules = false;
  variants = false;
// old 

  public sync: number = 100;
  public campus: number = 100;
  public mobility: number = 100;
  public eduLength = [1,2,3,4,5,6,7,8];
  public term = '4 года';
  //public presence: string = 'z';
  //public technology_type = 'd';

  public stepNext = false;

  public funcLength(val, term) {
    this.eduLength = val;
    this.term = term;
    this.sortSubject.next("term");
  }

  public setPresence(val, number){
    //this.presence = val;
    this.sync = number;
    this.sortSubject.next("sync");
  }

  public setTechnologyType(val, number){
    //this.technology_type = val;
    this.campus = number;
    this.sortSubject.next("campus");
  }


  constructor(private service: ConstructorService) { }


  public constructorTrajectory() {
    let status: Object = {};

    this.loadSubject.subscribe(
      (value: string) => {
        status[value] = true;
        if (status['targets']) {
          this.trajectory.setTarget(this.program.targets[0])
        };
        console.log(status);
      }
    );
  }

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
                                                program.competences,
                                                false );
                    this.getTargets(program_id);
                    this.getCompetences(program_id);
                    this.getChoiceGroups(program_id);
                    this.getModules(program_id);
                    this.getVariants(program_id);
                    this.constructorTrajectory();
                    this.loadSubject.next('program');
                  },
                  (error) => { console.log('Ошибка получения программы. API: /programs', error); }
                );
  }
  public getTargets( program_id: string ) {
    this.service.getElementsBySlug('get_program_targets', program_id)
                .subscribe(
                  (targets: any) => {
                    this.program.setTargets(targets);
                    this.targets = true;
                    this.loadSubject.next('targets');
                    console.log('dataService: Targets', true);
                  },
                  (error) => { console.log('Ошибка получения целей программы. API: /get_program_targets', error); }
                );
  }

  public getChoiceGroups( program_id: string ) {
    this.service.getElementsBySlug('get_program_choice_groups', program_id)
                .subscribe(
                  (choiceGroups: any) => {
                    this.program.setChoiceGroup(choiceGroups);
                    this.choice_groups = true;
                    this.loadSubject.next('choice_groups');
                    console.log('dataService: ChoiceGroups', true);
                  },
                  (error) => { console.error('Ошибка получения групп выбора. API: /get_program_choice_groups', error); }
                );
  }

  public getModules( program_id: string ) {
    this.service.getElementsBySlug('get_program_modules', program_id)
                .subscribe(
                  (modules: any) => {
                    this.program.setModules(modules);
                    //  old
                    //   this.trajectory.setModulesDefault(this.program.modules);
                    this.modules = true;
                    this.setModulesDefault(modules)
                    this.loadSubject.next('modules');
                    console.log('dataService: Modules', true);
                  },
                  (error) => { console.error('Ошибка получения модулей программы. API: /get_program_modules', error); }
                );
  }

  public getCompetences( program_id: string ) {
    this.service.getElementsBySlug('get_program_competences', program_id)
                .subscribe(
                  (competences: any) => {
                    this.program.setCompetences(competences);
                    this.competences = true;
                    this.loadSubject.next('competences');
                    console.log('dataService: Competences', true);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_competences', error); }
                );
  }
  public getVariants( program_id: string ) {
    this.service.getElementsBySlug('get_program_variants', program_id)
                .subscribe(
                  (variants: any) => {
                    this.program.setVariants(variants);
                    this.variants = true;
                    this.loadSubject.next('variants');
                    console.log('dataService: Variants', true);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_variants', error); }
                );
  };



// +++++++++++
public setModulesDefault(modules: any) {
  modules.forEach(
    (module) => {
      for ( let target in module.targets_positions_indexed ) {
        if(!this.choice_groups_status[target]) {
          this.choice_groups_status[target] = {};
        }
        if(!this.choice_groups_status[target][module.choice_group]) {
          console.log('первый раз' )
          this.choice_groups_status[target][module.choice_group] = true;
        }
        if ( module.targets_positions_indexed[target] === 2 && this.choice_groups_status[target][module.choice_group] ){
          this.choice_groups_status[target][module.choice_group] = false;
        } else if ( module.targets_positions_indexed[target] === 1 ) {
          this.choice_groups_status[target][module.choice_group] = true;
        } else if ( module.targets_positions_indexed[target] === 0 ){
          delete this.choice_groups_status[target][module.choice_group]
        }
      }
    }
  )
  console.log(this.choice_groups_status);
}
// +++++++++++






  public saveTrajectory() {
    this.service.postResponse('save_trajectory', JSON.stringify({ id: this.trajectory.id,
                                                                  program_id:  this.trajectory.program_id,
                                                                  data: this.trajectory })
                              ).subscribe(
                      (trajectory) => {
                         console.log('ok');
                      },
                      error => {
                        console.log(error);
                      });
  }

  public getTrajectory() {
    this.service.getElementsBySlug('get_trajectory_id', this.trajectory.id).subscribe(
                  (trajectory: any) => {
                    console.log(trajectory) ;
                  },
                  (error) => { console.log('Ошибка получения траектории', error); }
                );
  }

}