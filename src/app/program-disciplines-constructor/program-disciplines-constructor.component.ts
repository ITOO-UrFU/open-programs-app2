import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-program-disciplines-constructor',
  templateUrl: './program-disciplines-constructor.component.html',
  styleUrls: ['./program-disciplines-constructor.component.scss']
})
export class ProgramDisciplinesConstructorComponent implements OnInit {

  private subscription: Subscription;

  public program_id: any;
  public errorMessage: string;
  public disciplines: any;
  public program: any;
  public courses: any = [];
  public variants: any;
  public diagrams: any;
  // public technologies: any;

  callType(discipline_id, term_title, target_value) {
    const value = {program_id: this.program_id, discipline_id: discipline_id, term_title: term_title, semester: target_value};
    console.log(value);
    this.globalService.postResponseAdmin('change_discipline_semester', JSON.stringify(value))
                      .subscribe(
                      status => {
                         this.getDisciplineId(discipline_id);
                      },
                      error => {
                        if (error.indexOf('401') !== -1) { this.authService.logout(); }
                      }
                      );
  }
  changeVariant(value) {
    console.log(value);
    this.globalService.postResponse('change_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                         console.log(status);
                      },
                     error => {
                        if (error.indexOf('401') !== -1) { this.authService.logout(); }
                      }
                      );
  }

    constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService,
                private authService: AuthService,
              ) {
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.program_id = params['id'];
                        this.getDisciplinesVariants(this.program_id);
                        this.getDisciplines(this.program_id);
                        this.getProgram(this.program_id);
                        this.getCourses();
                        this.getDiagrams();
                        // this.getTechnologies();
                      },
                      error => this.errorMessage = 'Неверный адрес!'
                    );
                    router.events.subscribe(
                      (val) => {
                        this.errorMessage = '';
                      }
                    );
                  }


  public getProgram(slug: string) {
    this.globalService.getElementsBySlug('programs', slug)
                    .subscribe(
                      program => {
                        this.program = program;
                        console.log('Програма', program);
                      },
                      error => console.log(error)
                    );
  }
    public getCourses() {
    this.globalService.getElements('courses')
                    .subscribe(
                      courses => {
                        this.courses = courses;
                        console.log('Курсы', courses);
                      },
                      error => console.log(error)
                    );
  }
  public getDiagrams() {
    this.globalService.getElements('diagrams')
                    .subscribe(
                      diagrams => {
                        this.diagrams = diagrams;
                        console.log('Диаграммы', diagrams);
                      },
                      error => console.log(error)
                    );
  }
  //   public getTechnologies() {
  //   this.globalService.getElements('technologies')
  //                   .subscribe(
  //                     technologies => {
  //                       this.technologies = technologies;
  //                       console.log('Технологии', technologies);
  //                     },
  //                     error => console.log(error)
  //                   );
  // }

  public getDisciplines(slug: string) {
    this.globalService.getElementsBySlug('get_program_disciplines', slug)
                    .subscribe(
                      disciplines => {
                        this.disciplines = disciplines;
                        console.log('Список дисциплин', disciplines);
                      },
                      error => console.log(error)
                    );
  }

  public getDisciplineId(slug: string) {
    console.log('getDisciplineId', slug);
    this.globalService.getElementsBySlug('get_program_discipline/' + this.program_id, slug)
      .subscribe(
        discipline => {
          const iter = this.disciplines.findIndex((element) => { return element.id === slug; } );
          console.log('Дисциплина', this.disciplines[iter]);
          console.log('Дисциплина замена', discipline);

           this.disciplines[iter] = discipline;
        },
        error => console.log(error)
      );
  }

  public getDisciplinesVariants(slug: string) {
    console.log('test');
    this.globalService.getElementsBySlug('get_program_variants', slug)
                    .subscribe(
                      variants => {
                        this.variants = variants;
                        console.log('Список вариантов реализации дисциплин', variants);
                      },
                      error => console.log(error)
                    );
  }
  ngOnInit() {
    this.authService.activity();
  }
}
