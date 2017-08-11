// Angular 2
import { Injectable } from '@angular/core';

// Class
import { Program, Target } from './program2';
import { Trajectory } from './trajectory';

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


  targetSelected: Target;
  changesSubject: ReplaySubject<any> = new ReplaySubject();

  targets = false;
  competences = false;
  choice_groups = false;
  modules = false;
  variants = false;


  public sync: number = 100;
  public campus: number = 100;
  public mobility: number = 0;
  public eduLength = [1,2,3,4,5,6,7,8];
  public term = '4 года';
  public presence: string = 'z';
  public technology_type = 'd';

  public stepNext = false;

  public funcLength(val, term) {
    this.eduLength = val;
    this.term = term;
  }

  public setPresence(val, number){
    this.presence = val;
    this.sync = number;
  }

  public setTechnologyType(val, number){
    this.technology_type = val;
    this.campus = number;
  }


  constructor(private service: ConstructorService) { }

  

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
                    this.changesSubject.next(program)
                    this.getTargets(program_id);
                    this.getCompetences(program_id);
                    this.getChoiceGroups(program_id);
                    this.getModules(program_id);
                    this.getVariants(program_id);
                  },
                  (error) => { console.log('Ошибка получения программы. API: /programs', error); }
                );
  }
  public getTargets( program_id: string ) {
    this.service.getElementsBySlug('get_program_targets', program_id)
                .subscribe(
                  (targets: any) => {
                    this.program.setTargets(targets);
                    this.trajectory.setTarget(this.program.targets[0]);
                    this.targets = true;
                    this.changesSubject.next(targets)
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
                    this.trajectory.setModulesDefault(this.program.modules);
                    console.log(this.trajectory);
                    this.modules = true;
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
                    console.log('dataService: Variants', true);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_variants', error); }
                );
  };
}