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

  constructor( private router: Router, private service: ConstructorService ) { }

  // Функции работы с траекториями
  // Создание траектории
  public createTrajectory(program_id: string ) {
    this.service.postResponse('new_trajectory', JSON.stringify({program_id: program_id, data: {}}))
                .subscribe(
                      (trajectory: any) => {
                         this.router.navigate(['/constructor', 'program', trajectory.id]);
                      },
                      error => {
                        console.log(error);
                      });
  }
  // Переход на редактирование созданной траектории
  public editTrajectory(trajectory_id: string) {
    this.router.navigate(['/constructor', 'program', trajectory_id]);
  }

  // Функция получения созданных траекторий по крнкретной программе
  public getTrajectories(program: any) {
    this.service.getElementsBySlug('get_program_trajectory', program.id)
                .subscribe(
                  (trajectories: any) => {
                    this.trajectories[program.id] = trajectories;
                  },
                  (error) => {
                    console.log(error);
                  });
  }
  // Получение списка программ
  public getPrograms() {
    this.service.getElements('programs')
                .subscribe(
                  (data: any) => {
                    this.programList = data.map(
                      (program: any) => {
                        this.getTrajectories(program);
                        console.log(program)
                        return new Program( program.id,
                                    program.title,
                                    program.training_direction,
                                    program.get_level_display,
                                    program.get_competences_diagram,
                                    program.get_choice_groups,
                                    program.chief,
                                    program.competences );
                      }
                    );
                  },
                  (error) => {
                    console.log(error);
                  }
                );
  }

  ngOnInit() {
    this.getPrograms();
  }
}





