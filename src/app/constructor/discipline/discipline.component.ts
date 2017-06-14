import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';
import { DataService } from '../data.service';

@Component({
  selector: '[discipline]',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  @Input() public discipline;


  constructor( private service: ConstructorService ) { }

  ngOnInit() {

  }

}
