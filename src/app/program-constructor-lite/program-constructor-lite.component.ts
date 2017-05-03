import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-program-constructor-lite',
  templateUrl: './program-constructor-lite.component.html',
  styleUrls: ['./program-constructor-lite.component.scss']
})
export class ProgramConstructorLiteComponent implements OnInit {

  private subscription: Subscription;

  public errorMessage: string;
  public title: any;
  public modules: any;
  public targets: any;
  public selectValue: any;
  public choiceGroups: any;
  public currentChoiceGroups: any = 'all';
  public choiceCompetences: any;

/// 

  callType(value){
    let object = {};
    value = value.split(',');
    object["module_id"]=value[0];
    object["target_id"]=value[1];
    object["status"]=value[2];
    this.globalService.postTargetModule(JSON.stringify(object))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                    )
  }
  postChoiceGroups(value){

    let object = {};
    value = value.split(',');
    object["module_id"]=value[0];
    object["choice_group_id"]=value[1];
  
    this.globalService.postChoiceGroup(JSON.stringify(object))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                    )
  }
    sortChoiceGroups(value){
    this.currentChoiceGroups = value
  }
    sort(value){
      if (this.currentChoiceGroups=='all') return false
      else if (this.currentChoiceGroups==value) return false
      return true;
    }
      postCompetence(value){

    let object = {};
    value = value.split(',');
    object["module_id"]=value[0];
    object["competence_id"]=value[1];
  
    this.globalService.postChoiceCompetence(JSON.stringify(object))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                    )
  }

////

  constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) { 
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.setTitle(params['id']);
                        this.getProgramModules(params['id']);
                        this.getProgramTargets(params['id']);
                        this.getProgramChoiceGroups(params['id']);
                        this.getProgramCompetences(params['id'])
                      },
                      error => this.errorMessage = "Неверный адрес!"
                    );
                    router.events.subscribe(
                      (val) => {
                        this.errorMessage = "";
                      }
                    );
                  }

  public setTitle( newTitle: string) {
    this.title = newTitle;
    this.titleService.setTitle( newTitle );
  }

  public getProgramModules(slug:string){
    this.globalService.getElementsOpenPrograms('get_program_modules/'+slug)
                    .subscribe(
                      modules => {
                        this.modules = modules; 
                      },
                      error => console.log(error)
                    )
  }
    public getProgramTargets(slug:string){
    this.globalService.getElementsOpenPrograms('get_targets_by_program/'+slug)
                    .subscribe(
                      targets => {
                        this.targets = targets; 
                      },
                      error => console.log(error)
                    )
  }

    public getProgramChoiceGroups(slug:string){
    this.globalService.getElementsOpenPrograms('get_choice_groups_by_program/'+slug)
                    .subscribe(
                      choiceGroups => {
                        this.choiceGroups = choiceGroups;
                      },
                      error => console.log(error)
                    )
  }
    public getProgramCompetences(slug:string){
    this.globalService.getElementsOpenPrograms('get_competences_by_program/'+slug)
                    .subscribe(
                      choiceCompetences => {
                        this.choiceCompetences = choiceCompetences; console.log(choiceCompetences) 
                      },
                      error => console.log(error)
                    )
  }
  

  ngOnInit() {}

  ngOnDestroy() {
    this.errorMessage = "";
    this.subscription.unsubscribe()
  }
}
