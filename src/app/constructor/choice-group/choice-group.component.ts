import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

import { Program } from '../../models/program';
import { Trajectory } from '../../models/trajectory';
import { ChoiceGroup } from '../../models/choice-group';



@Component({
  selector: '[app-choice-group]',
  templateUrl: './choice-group.component.html',
  styleUrls: ['./choice-group.component.scss']
})
export class ChoiceGroupComponent implements OnInit {

  @Input() choice_group_id: string;
  public choice_group: ChoiceGroup;
  public trajectory: Trajectory;
  public program: Program;

  constructor(public data: DataService) { }

  laborSelectedModules() {
    return this.choice_group.modules.map(
      (module_id: string) => {
        if (this.trajectory.getModule(module_id)) {
          return this.trajectory.getModule(module_id).labor;
        } else {
          return 0;
        }
      }
    ).reduce((a, b) => a + b, 0);
  }

  toggle( module_id: string ) {
    if (!this.isFixed() && this.canToggle(module_id)){
      this.trajectory.toggleModule(this.program.getModule(module_id));
    }
  }
  isFixed() {
    if (this.choice_group.modules.length === this.choice_group.modules_default[this.trajectory.getTargetId()].length) {
      return this.choice_group.modules_default[this.trajectory.getTargetId()].map(
        element => {
          return this.choice_group.modules.indexOf(element) !== -1;
        }
      );
    } else {
      return false;
    }
  }
  canToggle( module_id: string ) {
    if (!this.trajectory.getModule(module_id) && this.choice_group.labor - this.laborSelectedModules() >= this.program.getModule(module_id).labor)
    {
      return true;
    } else if (this.trajectory.getModule(module_id)) {
      return true;
    } else {
      return false;
    }
  
  }

  // laborSelectedModules(){
  //   return this.data.trajectory.getModulesDefault(this.choice_group_id).map(
  //     module_id => this.data.program.getModule(module_id).get_labor
  //   ).reduce((a, b) => a + b, 0);
  // }

//   toggle( module_id ) {
//     { if (this.canToggle( module_id))
//       this.data.trajectory.toggleModule(this.data.program.getModule(module_id));
//     }
//   }


  ngOnInit() {
    this.choice_group = this.data.program.getChoiceGroup(this.choice_group_id);
    this.trajectory = this.data.trajectory;
    this.program = this.data.program;
  }

}
