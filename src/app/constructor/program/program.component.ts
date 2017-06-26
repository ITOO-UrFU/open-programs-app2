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
//
                    this.selected = targets[0].id;
//
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
  public selectTarget(id) {
    this.selected = id;
    for (const group of this.program.choice_groups ){
      this.modules[group.id] = {};
      this.modules[group.id].default = group.get_program_modules.filter(
        (module: any) => {
          return this.program.modules_by_id[module].targets_positions_indexed[this.selected] === 1;
        }
      );
      this.modules[group.id].variative = group.get_program_modules.filter(
        (module: any) => {
          return this.program.modules_by_id[module].targets_positions_indexed[this.selected] === 2;
        }
      );
      this.modules[group.id].status = ((this.modules[group.id].variative.length === 0) ? false : true );
    }
    console.log(this.modules);


    this.trajectory.getTarget(id);
    this.service.postResponse('save_trajectory', JSON.stringify({ id: this.trajectory.id,
                                                                  program_id:  this.trajectory.program_id,
                                                                  data: this.trajectory })
                             )
                .subscribe(
                      (trajectory) => {
                         console.log('ok');
                      },
                      error => {
                        console.log(error);
                      });
  }
  public buildTrajectory() {
    if ( this.program.complete_load().indexOf(false) === -1) {

      for (const group of this.program.choice_groups ){
        this.modules[group.id] = {};
        this.modules[group.id].default = group.get_program_modules.filter(
          (module: any) => {
            return this.program.modules_by_id[module].targets_positions_indexed[this.selected] === 1;
          }
        );
        this.modules[group.id].variative = group.get_program_modules.filter(
          (module: any) => {
            return this.program.modules_by_id[module].targets_positions_indexed[this.selected] === 2;
          }
        );
        this.modules[group.id].status = ((this.modules[group.id].variative.length === 0) ? false : true );
      }
      this.build = true;
      console.log('build');
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
    }
  }

  ngOnInit() {
    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {
                                  this.trajectory = new Trajectory( trajectory.id, trajectory.program );
                                  this.trajectory.getTarget(trajectory.data.target_id);
                                  this.getProgram(trajectory.program);
                                }
                              );
  }
}
