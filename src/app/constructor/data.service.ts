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
  public program: Program;
  public trajectory: Trajectory;

  sortSubject: ReplaySubject<any> = new ReplaySubject();
  loadSubject: ReplaySubject<any> = new ReplaySubject();
// old
  targets = false;
  competences = false;
  choice_groups = false;
  modules = false;
  variants = false;
  trajectoryBool = false

  public complete_load(): boolean {
    return [ this.competences, this.modules, this.choice_groups, this.targets, this.variants, this.trajectoryBool].indexOf(false) === -1;
  };


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
    const loading = {
      program: false,
      trajectory: false,
      targets: false,
      competences: false,
      choice_groups: false,
      modules: false,
      variants: false
    };

    const status = {
      getTrajectory: false,
      getTarget: false,
      getModules: false
    }


    this.loadSubject.subscribe(
      (value: string) => {
        loading[value] = true;
        console.log( 'Загрузка ' + value + ' завершена!' );

        if (loading.program) {
          console.log( 'Загрузка программы завершена!' );
          delete loading.program;
        }
        if (loading.trajectory && loading.targets && !status.getTarget) {
          if (!this.trajectory.getStatus()){
            this.trajectory.setTarget(this.program.targets[0]);
          }
          this.trajectoryBool = true;
          status.getTarget = true;
        }
        if (loading.choice_groups && loading.modules && !status.getModules){
          this.setModulesDefault();
          status.getModules = true;
        }
        if (status.getTarget && status.getModules){
          if (!this.trajectory.getStatus()){
            this.defaultModulesInTrajectory();
          }
        }
      }
    );
  }

  defaultModulesInTrajectory() {
    this.trajectory.removeAllModule();
    this.program.choice_groups.forEach(
      choice_group => {
        if (choice_group.modules_default[this.trajectory.getTargetId()]) {
          choice_group.modules_default[this.trajectory.getTargetId()].forEach(
            module_id => {
             this.trajectory.addModule(this.program.getModule(module_id));
            }
          );
        }
      }
    );
  }

  public createTrajectory(trajectory: any): Trajectory {
    this.trajectory = new Trajectory( trajectory.id, trajectory.program );
    console.log('DATA', trajectory, trajectory.data);
    if (trajectory.data) {
       this.trajectory.setTrajectoryData(trajectory.data);
    }
    this.loadSubject.next('trajectory');
    return this.trajectory;
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
                    console.log(this.program.targets)
                    this.targets = true;
                    this.loadSubject.next('targets');
                    console.debug('dataService: Targets', true);
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
                    console.debug('dataService: ChoiceGroups', true);
                  },
                  (error) => { console.error('Ошибка получения групп выбора. API: /get_program_choice_groups', error); }
                );
  }

  public getModules( program_id: string ) {
    this.service.getElementsBySlug('get_program_modules', program_id)
                .subscribe(
                  (modules: any) => {
                    this.program.setModules(modules);
                    this.modules = true;
                    this.loadSubject.next('modules');
                    console.debug('dataService: Modules', true);
                    
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
                    console.debug('dataService: Competences', true);
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
                    console.debug('dataService: Variants', true);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_variants', error); }
                );
  };




public setModulesDefault() {
  this.program.modules.forEach(
    (module) => {
      for (const key in module.targets_positions_indexed) {
        if (module.targets_positions_indexed.hasOwnProperty(key)) {
          if (module.targets_positions_indexed[key] === 1) {
            this.program.choice_groups_by_id[module.choice_group].setModulesDefault(module.id, key);
          }
        }
      }
    }
  );
}






  public saveTrajectory() {
    this.service.postResponse('save_trajectory', JSON.stringify({ id: this.trajectory.id,
                                                                  program_id:  this.trajectory.program_id,
                                                                  data: this.trajectory.getTrajectoryData() }) )
                .subscribe(
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