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

  private subscription: Subscription;

  public errorMessage: string;
  public title: any;
  public contents: any;


  constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) {
                    this.subscription = activateRoute.url.subscribe(
                      params => {
                        console.log('param_id', params[0].path)
                        this.setTitle(params[0].path);
                        this.getContentBySlug(params[0].path)
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

  public getContentBySlug(slug:string){
    this.globalService.getBySlug(slug)
                    .subscribe(
                      contents => {
                        this.contents = contents; console.log(this.contents) 
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
