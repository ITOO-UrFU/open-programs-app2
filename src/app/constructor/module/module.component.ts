import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: '[app-module]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  @Input() module_id: string;
  public module;


  click(){
    if ( this.data.program.targets_positions[this.data.trajectory.target_id].indexOf(this.module.id) === -1 ){
    console.log("перемещешие", this.module.id)
    this.data.program.targets_positions[this.data.trajectory.target_id].push(this.module.id);
    } else { this.data.program.targets_positions[this.data.trajectory.target_id].splice(this.data.program.targets_positions[this.data.trajectory.target_id].indexOf(this.module.id), 1)

    }
  }


  constructor(private data: DataService) { }

  ngOnInit() {
    this.module =  this.data.program.getModule(this.module_id);
  }

}
