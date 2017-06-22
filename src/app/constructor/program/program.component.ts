import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
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

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               private data: DataService ) { }

  public getProgram(program_id: string) {
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
                  },
                  (error) => { console.log('Ошибка получения программы. API: /programs', error); }
                );
  }
  public getTargets(program_id) {
    this.service.getElementsBySlug('get_program_targets', program_id)
                .subscribe(
                  (targets) => {
                    this.program.getTargets(targets);
                    if (this.create) {
                      this.trajectory.getTarget(this.program.targets[0].id);
                      this.trajectory.getChoiceGroups(this.program.targets[0].choice_groups);
                    }
                    this.getChoiceGroups(program_id);
                  },
                  (error) => { console.log('Ошибка получения целей программы. API: /get_program_targets', error); }
                );
  }

  public getChoiceGroups(program_id) {
    this.service.getElementsBySlug('get_program_choice_groups', program_id)
                .subscribe(
                  (choiceGroups) => {
                    this.program.getChoicGroup(choiceGroups);
                    if (this.create) {
                      let modulesList: any[];
                      modulesList = this.trajectory.choice_groups.map(
                        (choice_group_id) => {
                          return this.program.choice_groups_by_id[choice_group_id].get_program_modules;
                        }
                      );
                      this.trajectory.getModules(modulesList);
                    }
                    this.getModules(program_id);
                  },
                  (error) => { console.error('Ошибка получения групп выбора. API: /get_program_choice_groups', error); }
                );
  }

  public getModules(program_id: string) {
    this.service.getElementsBySlug('get_program_modules', program_id)
                .subscribe(
                  (modules: any) => {
                    this.program.getModules(modules);
                    if (this.create) {
                      let object = this.trajectory.modules_by_id_group;

                      for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                        object[key] = object[key].map( 
                          (module_id) => {
                            const _object = {};
                            _object[module_id] = this.program.modules_by_id[module_id].targets_positions_indexed[this.trajectory.target_id];
                            return _object;
                          }

                        );
                      }};
                    }
    
                  },
                  (error) => { console.error('Ошибка получения модулей программы. API: /get_program_modules', error); }
                );
  }

  public getCompetences(program_id) {
    this.service.getElementsBySlug('get_program_competences', program_id)
                .subscribe(
                  (competences) => {
                    this.program.getCompetences(competences);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_competences', error); }
                );
  }
  public selectTarget(id) {
    this.trajectory.getTarget(id);
    this.service.postResponse('save_trajectory', JSON.stringify({
                                                                  id: this.trajectory.id,
                                                                  program_id:  this.trajectory.program_id,
                                                                  data: this.trajectory
                                                                }))
                .subscribe(
                      (trajectory) => {
                         console.log('ok');
                      },
                      error => {
                        console.log(error);
                      });
  }
  ngOnInit() {
    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {

                                  this.trajectory = new Trajectory( trajectory.id, trajectory.program );
                                  this.trajectory.getTarget(trajectory.data.target_id);
                                  console.log('Trajectory', this.trajectory);
                                  this.getProgram(trajectory.program);

                                  if (trajectory.data) this.create = false;
                                  else this.create = true;
                                }
                              );
  }
}
