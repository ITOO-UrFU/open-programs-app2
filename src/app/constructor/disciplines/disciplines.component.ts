import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Program } from '../program';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: '[app-disciplines]',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  @Input() programId: string;

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.getProgram(this.programId);
  }
}
