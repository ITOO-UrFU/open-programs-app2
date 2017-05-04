import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';

@Component({
  selector: '[element-open-program]',
  templateUrl: './element-open-program.component.html',
  styleUrls: ['./element-open-program.component.scss']
})
export class ElementOpenProgramComponent implements OnInit {
  public programs;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
        this.globalService.getElementsOpenPrograms('programs')
                    .subscribe(
                      programs => {
                        this.programs = programs; console.log(this.programs) 
                      },
                      error => console.log(error)
                    )

  }

}
