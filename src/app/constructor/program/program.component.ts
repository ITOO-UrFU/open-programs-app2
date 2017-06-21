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
  public targets;
  public targetsObject = {};
  public modules;
  public modulesObject = {};
  public choiceGroups;
  public choiceGroupsObject = {};
  public competences;
  public competencesObject = {};
  public trajectory: Trajectory;

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

                    this.getModules(program_id);
                    this.getChoiceGroups(program_id);
                    this.getTargets(program_id);
                    this.getCompetences(program_id);
                  },
                  (error) => { console.log('Ошибка получения программы. API: /programs', error); }
                );
  }

  public getModules(program_id: string) {
    this.service.getElementsBySlug('get_program_modules', program_id)
                .subscribe(
                  (modules: any) => {
                    this.program.getModules(modules);
                  },
                  (error) => { console.error('Ошибка получения модулей программы. API: /get_program_modules', error); }
                );
  }

  public getChoiceGroups(program_id) {
    this.service.getElementsBySlug('get_program_choice_groups', program_id)
                .subscribe(
                  (choiceGroups) => {
                    this.program.getChoicGroup(choiceGroups);
                  },
                  (error) => { console.error('Ошибка получения групп выбора. API: /get_program_choice_groups', error); }
                );
  }

  public getTargets(program_id) {
    this.service.getElementsBySlug('get_program_targets', program_id)
                .subscribe(
                  (targets) => {
                    this.program.getTargets(targets);
                    this.trajectory.getTarget(targets[0].id, targets.choice_groups)
                  },
                  (error) => { console.log('Ошибка получения целей программы. API: /get_program_targets', error); }
                );
  }

  public getCompetences(program_id) {
    this.service.getElementsBySlug('get_program_competences', program_id)
                .subscribe(
                  (competences) => {
                    this.program.getCompetences(competences);console.log('program', this.program);
                  },
                  (error) => { console.log('Ошибка получения компетенций программы. API: /get_program_competences', error); }
                );
  }
  public selectTarget(id) {
    this.trajectory.target.id = id;
    this.service.postResponse('save_trajectory', JSON.stringify({id: this.trajectory.id, program_id: this.trajectory.program.id, data: {target: id}}))
                .subscribe(
                      (trajectory) => {
                         console.log(trajectory);
                      },
                      error => {
                        console.log(error);
                      });
  }
  ngOnInit() {
    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {
                                  this.trajectory = new Trajectory( trajectory.id,
                                                                    trajectory.program );
                                  this.getProgram(trajectory.program);
                                  console.log(this.trajectory);
                                }
                              );
  }
}
