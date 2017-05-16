import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-program-disciplines-constructor',
  templateUrl: './program-disciplines-constructor.component.html',
  styleUrls: ['./program-disciplines-constructor.component.scss']
})
export class ProgramDisciplinesConstructorComponent implements OnInit {
  
  private subscription: Subscription;

  public errorMessage: string;
  public disciplines: any;
  public program: any;


  callType(value){
    console.log(value);
    this.globalService.postMassege('change_discipline_semester/', JSON.stringify(value))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                      )
  }

    constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) { 
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.getDisciplines(params['id']);
                        this.getProgram(params['id']);
                      },
                      error => this.errorMessage = "Неверный адрес!"
                    );
                    router.events.subscribe(
                      (val) => {
                        this.errorMessage = "";
                      }
                    );
                  }

    public getDisciplines(slug:string){
    this.globalService.getElementsOpenPrograms('get_program_disciplines/'+slug)
                    .subscribe(
                      disciplines => {
                        this.disciplines = disciplines; 
                        console.log(disciplines)
                      },
                      error => console.log(error)
                    )
  }
  public getProgram(slug:string){
    this.globalService.getElementsOpenPrograms('programs/'+slug)
                    .subscribe(
                      program => {
                        this.program = program; 
                        console.log(program)
                      },
                      error => console.log(error)
                    )
  }

  ngOnInit() {
  }

}
