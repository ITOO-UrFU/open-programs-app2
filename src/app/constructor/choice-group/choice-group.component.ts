import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

import { ChoiceGroup } from '../program2';


@Component({
  selector: '[app-choice-group]',
  templateUrl: './choice-group.component.html',
  styleUrls: ['./choice-group.component.scss']
})
export class ChoiceGroupComponent implements OnInit {

  @Input() choice_group_id: string;
  public choice_group: ChoiceGroup;

  constructor(public data: DataService) { }

  ngOnInit() {
    this.choice_group = this.data.program.getChoiceGroup(this.choice_group_id);
    console.log(this.choice_group)
  }

}
