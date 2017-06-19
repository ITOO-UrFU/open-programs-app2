import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { ConstructorService } from '../constructor.service';

import { Program } from '../program';


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  public programList: Program[];
  public trajectories = {};

  constructor(private router: Router, private service: ConstructorService) { }

  public onSelect(id: string ) {
    let trajectory: any;
    this.service.postResponse('new_trajectory', JSON.stringify({program_id: id, data:{}}))
                      .subscribe(
                      newTrajectory => {
                         trajectory  = newTrajectory;
                         console.log(trajectory)
                         this.router.navigate(['/constructor', 'program', trajectory.id]);
                      },
                      error => {
                        console.log(error);
                      }
                    )
    // this.router.navigate(['/constructor', 'program', trajectory_id]);
  }

  public getTr(program: any){
  this.service.getElementsBySlug('get_program_trajectory', program.id)
              .subscribe(
                (trajectories: any) => {
                  console.log(trajectories);
                  this.trajectories[program.id] = trajectories;
                },
                error => {
                  console.log(error);
                }
              );
}

  ngOnInit() {
    this.service.getElements('programs')
                .subscribe(
                  (data) => {
                    this.programList = data.map((program: any) => {
                                                                    this.getTr(program);
                                                                    return new Program( program.id,
                                                                                program.title,
                                                                                program.training_direction,
                                                                                program.get_level_display,
                                                                                program.get_competences_diagram,
                                                                                program.get_choice_groups,
                                                                                program.chief,
                                                                                program.competences );
                    });
                    console.log(this.programList);
                  },
                  error => {
                    console.log(error)
                  }
                );
  }
}





