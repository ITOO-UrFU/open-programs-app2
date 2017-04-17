import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public errorMessage: string;
  private subscription: Subscription;
  public title: any;

  constructor (
              private router: Router,
              private activateRoute: ActivatedRoute,
              private titleService: Title
              ) { 
                  this.subscription = activateRoute.params.subscribe(
                      params => this.setTitle(params['id']),
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


  ngOnInit() {
  }

}
