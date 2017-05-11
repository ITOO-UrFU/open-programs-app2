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

    constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) { 
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        console.log(params['id']);
                      },
                      error => this.errorMessage = "Неверный адрес!"
                    );
                    router.events.subscribe(
                      (val) => {
                        this.errorMessage = "";
                      }
                    );
                  }

  ngOnInit() {
  }

}
