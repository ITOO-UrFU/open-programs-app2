import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructorRoutingModule } from './constructor-routing.module';
import { ProgramListComponent } from './program-list/program-list.component';
import { ConstructorService } from './constructor.service';
import { ProgramComponent } from './program/program.component'

@NgModule({
  imports: [
    CommonModule,
    ConstructorRoutingModule
  ],
  providers: [ConstructorService],
  declarations: [ProgramListComponent, ProgramComponent]
})
export class ConstructorModule { }
