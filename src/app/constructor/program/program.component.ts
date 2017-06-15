import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';
import { DataService } from '../data.service';
// import { DisciplineComponent } from '../discipline/discipline.component'

import { Trajectory } from '../trajectory'

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  private program;
  private path={};
  private targets;
  private targetsObject = {};
  private modules;
  private modulesObject = {};
  private choiceGroups;
  private choiceGroupsObject = {};
  private competences;
  private competencesObject = {};
  private trajectory:Trajectory;

  private test;

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               private data: DataService ) { }
  
  change(value){
    this.path['title'] = this.targetsObject[value].id;
    this.path['index'] = this.targetsObject[value].index;
    this.trajectory = new Trajectory('test',this.program, this.modules)
    console.log(this.trajectory)
    console.log(this.test);
  }

  ngOnInit() {
    this.test = this.data.getProgram();
    
    // Скорость получения данных выше чем отправка. Нужно использовать rxjs

    this.activateRoute.params
      .switchMap((params: Params) => this.service.getElementsBySlug('programs', params['id']))
      .subscribe((program) => {
        this.program = program;
        this.titleService.setTitle(this.program.title);
        this.service.getElementsBySlug('get_program_targets', this.program.id)
                    .subscribe(
                      targets => {
                        this.targets = targets;
                        this.targets.map((element, index) => { this.targetsObject[element.id] = element;
                                                                      this.targetsObject[element.id].index = index;  });

                      }
                    )
        this.service.getElementsBySlug('get_program_competences', this.program.id)
                    .subscribe(
                      competences => {
                        this.competences = competences; 
                        this.competences.map(element => this.competencesObject[element.id] = element );
                      }
                    )  
        this.service.getElementsBySlug('get_program_choice_groups', this.program.id)
                    .subscribe(
                      choiceGroups => {
                        this.choiceGroups = choiceGroups;
                        this.choiceGroups.map(element => this.choiceGroupsObject[element.id] = element);
                        
                      }
                    )
        this.service.getElementsBySlug('get_program_modules', this.program.id)
                    .subscribe(
                      modules => {
                        this.modules = modules; console.log(this.modules);
                        this.modules.map(element => { this.modulesObject[element.id] = element;
                                                      this.modulesObject[element.id].status=false }
                                        );
                      }
                    )
      });
  }
}
