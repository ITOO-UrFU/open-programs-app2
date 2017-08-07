import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructorRoutingModule } from './constructor-routing.module';
import { ProgramListComponent } from './program-list/program-list.component';
import { ConstructorService } from './constructor.service';
import { DataService } from './data.service';
import { ProgramComponent } from './program/program.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { TargetComponent } from './target/target.component';
import { ChoiceGroupComponent } from './choice-group/choice-group.component';
import { ModuleComponent } from './module/module.component';
import { CompetenceComponent } from './competence/competence.component'

@NgModule({
  imports: [
    CommonModule,
    ConstructorRoutingModule
  ],
  providers: [ConstructorService, DataService],
  declarations: [ProgramListComponent, ProgramComponent, DisciplineComponent, DisciplinesComponent, TargetComponent, ChoiceGroupComponent, ModuleComponent, CompetenceComponent]
})
export class ConstructorModule { }
