import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: '[app-discipline]',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  @Input() public discipline;

  constructor( public data: DataService ) { }

  ngOnInit() {

  }

}
