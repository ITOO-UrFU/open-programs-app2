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

  constructor(private router: Router, private service: ConstructorService) { }

  public onSelect(id: string ) {
    let trajectory_id: string = 'w2w2w2w2w';
    this.service.postResponse('new_trajectory', JSON.stringify({program_id: id, data:{}}))
                      .subscribe(
                      status => {
                         console.log("status", status);
                      },
                      error => {
                        console.log(error);
                        trajectory_id = 'q1q1q1q1q1q1q1';
                      }
                    )
    // this.router.navigate(['/constructor', 'program', trajectory_id]);
  }

  ngOnInit() {
    this.service.getElements('programs')
                .subscribe(
                  (data) => {
                    console.log(data);
                    this.programList = data.map((program: any) => new Program( program.id,
                                                                                program.title,
                                                                                program.training_direction,
                                                                                program.get_level_display,
                                                                                program.get_competences_diagram,
                                                                                program.get_choice_groups,
                                                                                program.chief,
                                                                                program.competences )
                                                                  );
                    console.log(this.programList);
                  },
                  error => {
                    console.log(error)
                  }
                );
  }
}







