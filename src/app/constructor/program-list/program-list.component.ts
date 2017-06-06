import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ConstructorService } from '../constructor.service'


@Component({
  selector: '.program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  public programList: Array<any>;

  constructor(private service: ConstructorService) { }

  ngOnInit() {
    this.service.getElements('programs')
                .subscribe(
                  data => {
                    this.programList = data;
                  },
                  error => {
                    console.log(error)
                  }
                )
  }

}







