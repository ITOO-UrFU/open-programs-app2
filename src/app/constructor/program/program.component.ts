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
                                                program.competences);
                    this.getModules(program_id);
                    this.getChoiceGroups(program_id);
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

  public _getChoiceGroups(program_id) {
    this.service.getElementsBySlug('get_program_choice_groups', this.program.id)
            .subscribe(
              choiceGroups => {
                this.choiceGroups = choiceGroups;
                this.trajectory.groups(choiceGroups);
                this.choiceGroups.map(element => {
                  this.choiceGroupsObject[element.id] = element;
                  this.choiceGroupsObject[element.id].get_program_modules_status = element.get_program_modules.map(
                    module_id => {
                      return this.modulesObject[module_id].targets_positions.map(value => {
                        if (value === 1) { return 'selected' }
                        else if (value === 2) { return 'available' }
                        else { return 'disabled' }
                      });
                    });
                });
                console.log(this.choiceGroupsObject);
                console.log('this.trajectory', this.trajectory);
              }
            );
  }

  public getTargets() {
    this.service.getElementsBySlug('get_program_targets', this.program.id)
                .subscribe(
                  (targets) => {
                    this.targets = targets;
                    this.targets.map((element, index) => { this.targetsObject[element.id] = element;
                                                            this.targetsObject[element.id].index = index;
                                                          });

                  },
                  (error) => { console.log('Ошибка получения целей программы. API: /get_program_targets', error); }
                );
  }



  ngOnInit() {

    // Скорость получения данных выше чем отправка. Нужно использовать rxjs

    this.activateRoute.params.switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
                             .subscribe(
                                (trajectory: any) => {
                                  this.trajectory = new Trajectory( trajectory.id, trajectory.program );
                                  this.getProgram(trajectory.program);
                                  







      this.service.getElementsBySlug( 'programs', trajectory.program )
      .subscribe((program: any) => {
        this.program = new Program( program.id,
                                    program.title,
                                    program.training_direction,
                                    program.get_level_display,
                                    program.get_competences_diagram,
                                    program.get_choice_groups,
                                    program.chief,
                                    program.competences );

        console.log(this.trajectory, this.program);
        this.titleService.setTitle(this.program.title);

        this.service.getElementsBySlug('get_program_competences', this.program.id)
                    .subscribe(
                      competences => {
                        console.log(competences);
                        this.competences = competences;
                        this.competences.map(element => this.competencesObject[element.id] = element );
                      }
                    );

      });})
  }
}
