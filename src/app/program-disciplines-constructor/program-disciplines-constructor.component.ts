import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../global.service';

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
  public technologies: any;

  callType(value){
    console.log(value);
    this.globalService.postResponse('change_discipline_semester', JSON.stringify(value))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                      )
  }
  changeVariant(value){
    console.log(value);
    this.globalService.postResponse('change_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                         console.log(status) 
                      },
                      error => console.log(error)
                      )
  }

    constructor ( private router: Router,
                private activateRoute: ActivatedRoute,
                private titleService: Title,
                private globalService: GlobalService
              ) { 
                    this.subscription = activateRoute.params.subscribe(
                      params => {
                        this.program_id = params['id']
                        this.getDisciplinesVariants(this.program_id);
                        this.getDisciplines(this.program_id);
                        this.getProgram(this.program_id);
                        this.getCourses();
                        this.getDiagrams();
                        this.getTechnologies()
                      },
                      error => this.errorMessage = "Неверный адрес!"
                    );
                    router.events.subscribe(
                      (val) => {
                        this.errorMessage = "";
                      }
                    );
                  }


  public getProgram(slug:string){
    this.globalService.getElements('programs/'+slug)
                    .subscribe(
                      program => {
                        this.program = program; 
                        console.log('Програма', program)
                      },
                      error => console.log(error)
                    )
  }
    public getCourses(){
    this.globalService.getElements('courses')
                    .subscribe(
                      courses => {
                        this.courses = courses; 
                        console.log('Курсы', courses)
                      },
                      error => console.log(error)
                    )
  }
  public getDiagrams(){
    this.globalService.getElements('diagrams')
                    .subscribe(
                      diagrams => {
                        this.diagrams = diagrams; 
                        console.log('Диаграммы', diagrams)
                      },
                      error => console.log(error)
                    )
  }
    public getTechnologies(){
    this.globalService.getElements('technologies')
                    .subscribe(
                      technologies => {
                        this.technologies = technologies; 
                        console.log('Технологии', technologies)
                      },
                      error => console.log(error)
                    )
  }
  
  public getDisciplines(slug:string){
    this.globalService.getElements('get_program_disciplines/'+slug)
                    .subscribe(
                      disciplines => {
                        this.disciplines = disciplines; 
                        console.log('Список дисциплин', disciplines)
                      },
                      error => console.log(error)
                    )
  }
  public getDisciplinesVariants(slug:string){
    this.globalService.getElements('get_program_variants/'+slug)
                    .subscribe(
                      variants => {
                        this.variants = variants;
                        console.log('Список вариантов реализации дисциплин', variants)
                      },
                      error => console.log(error)
                    )
  }
  public addVariant(value){
    console.log(value);
       this.globalService.postResponse('create_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                        this.getDisciplinesVariants(this.program_id)
                       console.log(status) 
                      },
                      error => console.log(error)
                      )
  }
    public removeVariant(value){
    console.log(value);
       this.globalService.postResponse('delete_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                        this.getDisciplinesVariants(this.program_id)
                       console.log(status) 
                      },
                      error => console.log(error)
                      )
  }

  ngOnInit() {
  }

}
