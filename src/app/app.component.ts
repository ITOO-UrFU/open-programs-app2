import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  menu: any = []; // TODO: Написать класс который будет описывать элемент массива

  constructor(private globalService: GlobalService){}

  ngOnInit(){
    this.globalService.getByType('menu')
                      .subscribe(
                        menu => {this.menu = menu; console.log(this.menu) },
                        error => console.log(error));

  }
}