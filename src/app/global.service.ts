// Angular
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

// Classes
import { Program } from './program';

// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GlobalService {
  public consoleStatus: boolean = true; // вынести настройки в отдельный файл

  // private serverURL = 'http://212.193.94.145:8080/api/v11/';
  private serverURL = 'http://10.16.208.154:8080/api/v11/';
  private index: number = 0;
  private result: any;
  private footer: any;

  constructor (
    private http: Http,
    private authService: AuthService,
    ) {};


  getConsntainers(): any {
    if (!this.result){
      if (this.consoleStatus) {
        console.log('getConsntainers(): Запрос двнных')
      }
      this.result = this.http.get(this.serverURL + 'containers/?format=json')
                             .map(this.extractData)
                             .catch(this.handleError);
    }
    this.index++;
    console.log('getConsntainers(): Получент '+ this.index +'раз' )
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


  private extractData(res: Response) {
    return res.json();
  }

// Получение элементов Открытой образовательной программы

  getElements(type:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.serverURL + type);
    }
    return this.http.get(this.serverURL + type +'/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getElementsBySlug(type:string, slug:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.serverURL + type + '/' + slug);
    }
    return this.http.get(this.serverURL + type + '/' + slug + '/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }


// Здесь начинаются POST запросы к серверу для отправки от клиента

  public postResponse(api, value):any {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (this.consoleStatus) {
        console.log('POST to ' + api + ':', this.serverURL + api);
        console.log('value:', value);
      }
      return this.http.post(this.serverURL + api + '/', value, this.jwt())
                    .map(res => res.json())
                    .catch(this.handleError);
  }

    public postResponseAdmin(api, value): any {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (this.consoleStatus) {
        console.log('POST to ' + api + ':', this.serverURL + api);
        console.log('value:', value);
      }
      return this.http.post(this.serverURL + api + '/', value, this.jwt())
                    .map(res => res)
                    .catch(this.handleError);
  }

  private jwt() {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const currentUser = this.authService.getCurrentUser();
        if (currentUser != null) {
          if (currentUser.token) {
              headers.append('Authorization', currentUser.token);
          }
        }
        return new RequestOptions({ headers: headers });
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
