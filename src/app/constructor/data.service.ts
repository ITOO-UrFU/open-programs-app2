// Angular 2
import { Injectable } from '@angular/core';

// Class

// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Variables

export let program: any[] = [{test: 'Тестовые данные'}];


@Injectable()
export class DataService {

  getProgram():any{
    return program;
  };
  setProgram(value): any{
    program = value;
  };

  constructor() { }

}
