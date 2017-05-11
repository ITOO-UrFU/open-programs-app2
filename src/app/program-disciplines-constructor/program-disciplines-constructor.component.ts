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

    constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) { 
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.getDisciplines(params['id']);
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

  ngOnInit() {
  }

}
