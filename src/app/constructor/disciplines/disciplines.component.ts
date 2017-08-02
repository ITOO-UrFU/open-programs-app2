import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

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
