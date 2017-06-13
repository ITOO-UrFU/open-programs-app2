import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  private program;
  private targets;
  private targetsObject = {};
  private modules;
  private modulesObject = {};
  private choiceGroups;
  private choiceGroupsObject = {};

  private test;

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService,
               private data: DataService ) { }

  ngOnInit() {
    this.test = this.data.getProgram()
    console.log(this.test)

    this.activateRoute.params
      .switchMap((params: Params) => this.service.getElementsBySlug('programs', params['id']))
      .subscribe((program) => {
        this.program = program;
        this.titleService.setTitle(this.program.title);
        this.service.getElementsBySlug('get_program_targets', this.program.id)
                    .subscribe(
                      targets => {
                        this.targets = targets;
                        this.targets.map(element => this.targetsObject[element.id] = element);
                      }
                    )
        this.service.getElementsBySlug('get_program_choice_groups', this.program.id)
                    .subscribe(
                      choiceGroups => {
                        this.choiceGroups = choiceGroups;
                        this.choiceGroups.map(element => this.choiceGroupsObject[element.id] = element);
                        console.log(choiceGroups)
                      }
                    )
        this.service.getElementsBySlug('get_program_modules', this.program.id)
                    .subscribe(
                      modules => {
                        this.modules = modules; console.log(this.modules);
                        this.modules.map(element => this.modulesObject[element.id] = element);
                      }
                    )  
      });
  }
}
