import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  containers: any = []; // TODO: Написать класс который будет описывать элемент массива

  constructor(private globalService: GlobalService){}

  ngOnInit(){
    this.globalService.getConsntainers()
                      .subscribe(
                        containers => {this.containers = containers;console.debug(this.containers)},
                        error => console.log(error));

  }
}