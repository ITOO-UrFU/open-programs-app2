// Angular
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

// Classes


// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ConstructorService {

  public consoleStatus: boolean = false; // вынести настройки в отдельный файл

   // private serverURL = 'http://212.193.94.145:8080/api/v11/';
   private serverURL = 'http://10.16.208.154:8080/api/v11/';

  constructor(private http: Http) { }

  // Получение элементов Открытой образовательной программы

  public getElements(type:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.serverURL + type);
    }
    return this.http.get(this.serverURL + type +'/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  public getElementsBySlug(type:string, slug:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.serverURL + type + '/' + slug);
    }
    return this.http.get(this.serverURL + type + '/' + slug + '/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  public postResponse(api, value): any {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this.serverURL + api + '/', value, options)
                    .map(res => res.json())
                    .catch(this.handleError);
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
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
  

}
