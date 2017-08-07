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

  laborSelectedModules(){
    return this.data.trajectory.getModulesDefault(this.choice_group_id).map(
      module_id => this.data.program.getModule(module_id).get_labor
    ).reduce((a, b) => a + b, 0);
  }

  index(){return 3}
  ngOnInit() {
    this.choice_group = this.data.program.getChoiceGroup(this.choice_group_id);
  }

}
