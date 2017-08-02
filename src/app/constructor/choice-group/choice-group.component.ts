import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: '[app-choice-group]',
  templateUrl: './choice-group.component.html',
  styleUrls: ['./choice-group.component.scss']
})
export class ChoiceGroupComponent implements OnInit {

    @Input() choice_group: string;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
