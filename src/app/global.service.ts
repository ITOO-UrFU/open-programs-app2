// Angular
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

// Classes
import { Program } from './program'

// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
  private serverURL = 'http://212.193.94.145:8080/api/v11/';
  //private serverURL = 'http://10.16.208.154:8080/api/v11/';
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
      this.footer = this.http.get(this.serverURL + 'containers_by_type/footer/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError);
    }
    return this.footer;
  }
  getBySlug(slug:string):any {
    return this.http.get(this.serverURL + 'container_by_slug/'+ slug +'/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  getByType(type:string):any {
    return this.http.get(this.serverURL + 'containers_by_type/' + type +'/?format=json')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getProgramsList():any {
      return this.http.get(this.serverURL + 'programs/?format=json')
                    .map((res: Response) => {return res.json() as Program[]})
                    .catch(this.handleError);
  }

  getElementsOpenPrograms(type:string):any {
      return this.http.get(this.serverURL + type +'/?format=json')
                    .map(this.extractData)
                    .catch(this.handleError);
  }


// Здесь начинаются POST запросы к серверу для отправки от клиентна

  postMassege(api, value):any {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      console.log('POST to ' + api + ':', this.serverURL + api);
      console.log('value:', value)
      return this.http.post(this.serverURL + api, value, options)
                    .map(this.extractDataPost)
                    .catch(this.handleError);
  }

  postTargetModule(value):any {
    console.log("ok!")
    console.log(value)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      console.log(this.serverURL + 'change_target_module/')
      return this.http.post(this.serverURL + 'change_target_module/', value, options)
                    .map(this.extractDataPost)
                    .catch(this.handleError);
  }

postChoiceGroup(value):any {
    console.log("ok!")
    console.log(value)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.serverURL + 'change_choice_group/', value, options)
                    .map(this.extractDataPost)
                    .catch(this.handleError);
}

postChoiceCompetence(value):any {
    console.log("ok!")
    console.log(value)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.serverURL + 'change_competence/', value, options)
                    .map(this.extractDataPost)
                    .catch(this.handleError);
}

  private extractDataPost(res: Response) {
    return res;
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
