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
  public path={};
  public targets;
  private targetsObject = {};
  public modules;
  private modulesObject = {};
  public choiceGroups;
  private choiceGroupsObject = {};
  public competences;
  private competencesObject = {};
  public trajectory:Trajectory;

  private test;

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               private data: DataService ) { }

  change(value){
    this.path['title'] = this.targetsObject[value].id;
    this.path['index'] = this.targetsObject[value].index;

  }

  ngOnInit() {
    this.test = this.data.getProgram();

    // Скорость получения данных выше чем отправка. Нужно использовать rxjs

    this.activateRoute.params
      .switchMap((params: Params) => this.service.getElementsBySlug('get_trajectory_id', params['id']))
      .subscribe((trajectory: any) => {
      this.service.getElementsBySlug('programs', trajectory.program)
      .subscribe((program: any) => {
        this.program = new Program( program.id,
                                    program.title,
                                    program.training_direction,
                                    program.get_level_display,
                                    program.get_competences_diagram,
                                    program.get_choice_groups,
                                    program.chief,
                                    program.competences );
        this.trajectory = new Trajectory('test', this.program)
        console.log(this.trajectory)
        this.titleService.setTitle(this.program.title);
        this.service.getElementsBySlug('get_program_targets', this.program.id)
                    .subscribe(
                      targets => {
                        this.targets = targets;
                        this.targets.map((element, index) => { this.targetsObject[element.id] = element;
                                                               this.targetsObject[element.id].index = index;
                                                              });

                      }
                    );
        this.service.getElementsBySlug('get_program_competences', this.program.id)
                    .subscribe(
                      competences => {
                        this.competences = competences;
                        this.competences.map(element => this.competencesObject[element.id] = element );
                      }
                    );
        this.service.getElementsBySlug('get_program_choice_groups', this.program.id)
                    .subscribe(
                      choiceGroups => {
                        this.choiceGroups = choiceGroups;
                        this.choiceGroups.map(element => this.choiceGroupsObject[element.id] = element);
                      }
                    );
        this.service.getElementsBySlug('get_program_modules', this.program.id)
                    .subscribe(
                      modules => {
                        this.modules = modules;
                        this.modules.map(element => { this.modulesObject[element.id] = element;
                                                      this.modulesObject[element.id].status = false;
                                                   });
                        this.trajectory.modules(modules);
                      }
                    );
      });})
  }
}
