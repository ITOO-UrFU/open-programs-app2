import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
  //private serverURL = 'http://212.193.94.145:8080/api/v11/';
  private serverURL = 'http://10.16.208.154:8080/api/v11/';
  private index: number = 0;
  private result: any;
  private footer: any;

  constructor (private http: Http) {};

  getConsntainers(): any {
    if (!this.result){
      console.debug('getConsntainers(): Запрос двнных')
      this.result = this.http.get(this.serverURL + 'containers/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError);
    }
    this.index++;
    console.debug('getConsntainers(): Получент '+ this.index +'раз' )
    return this.result;
  }
  getFooter(): any {
    if (!this.footer){
      console.debug('getConsntainers(): Запрос двнных')
      this.footer = this.http.get(this.serverURL + 'containers_by_type/footer/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError);
    }
    return this.footer;
  }





  private extractData(res: Response) {
    return res.json();
  }
  //TODO: Разобраться что делает функция обработки ошибок
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
