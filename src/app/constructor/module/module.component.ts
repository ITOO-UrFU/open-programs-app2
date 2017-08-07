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

  toggle(){
    console.log( "Toggle!", this.module );
    this.data.trajectory.toggleModule(this.module);
  }

  constructor(private data: DataService) { }

  ngOnInit() {
    this.module =  this.data.program.getModule(this.module_id);
  }

}
