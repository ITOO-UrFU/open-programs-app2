import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public errorMessage: string;
  private subscription: Subscription;
  
  public title: any;
  public contants: any;


  constructor (
              private router: Router,
              private activateRoute: ActivatedRoute,
              private titleService: Title,
              private globalService: GlobalService

              ) { 
                  this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.setTitle(params['id']);
                        this.getContentBySlug(params['id'])
                      },
                      error => this.errorMessage = "Неверный адрес!"
                  );

                router.events.subscribe((val) => {
                      this.errorMessage = "";
                });
              }

  public setTitle( newTitle: string) {
    this.title = newTitle;
    this.titleService.setTitle( newTitle );
  }

  public getContentBySlug(slug:string){
    this.globalService.getBySlug(slug)
                    .subscribe(
                      contants => {this.contants = contants; console.debug(this.contants) },
                      error => console.log(error)
                    )
                    

  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.errorMessage = "";
    this.subscription.unsubscribe()
  }

}
