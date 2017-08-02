// Angular
import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

// Classes
import { Program } from './program';

import { APP_CONFIG, IAppConfig } from '././app.config';


// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GlobalService {
  public consoleStatus: boolean = true; // вынести настройки в отдельный файл

  private index: number = 0;
  private result: any;
  private footer: any;

  constructor (
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: Http,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    ) {};


  getConsntainers(): any {
    if (!this.result){
      if (this.consoleStatus) {
        console.log('getConsntainers(): Запрос двнных')
      }
      this.result = this.http.get(this.config.apiEndpoint + 'containers/?format=json')
                             .map(this.extractData)
                             .catch(this.handleError.bind(this));
    }
    this.index++;
    console.log('getConsntainers(): Получент '+ this.index +'раз' )
    return this.result;
  }
  getFooter(): any {
    if (!this.footer){
      this.footer = this.http.get(this.config.apiEndpoint + 'containers_by_type/footer/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError.bind(this));
    }
    return this.footer;
  }
  getBySlug(slug:string):any {
    return this.http.get(this.config.apiEndpoint + 'container_by_slug/'+ slug +'/?format=json')
                      .map(this.extractData)
                      .catch(this.handleError.bind(this));
  }
  getByType(type:string):any {
    return this.http.get(this.config.apiEndpoint + 'containers_by_type/' + type +'/?format=json')
                    .map(this.extractData)
                    .catch(this.handleError.bind(this));
  }


  private extractData(res: Response) {
    return res.json();
  }

// Получение элементов Открытой образовательной программы

  getElements(type:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.config.apiEndpoint + type);
    }
    return this.http.get(this.config.apiEndpoint + type +'/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError.bind(this));
  }

  getElementsBySlug(type:string, slug:string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.config.apiEndpoint + type + '/' + slug);
    }
    return this.http.get(this.config.apiEndpoint + type + '/' + slug + '/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError.bind(this));
  }


// Здесь начинаются POST запросы к серверу для отправки от клиента

  public postResponse(api, value):any {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (this.consoleStatus) {
        console.log('POST to ' + api + ':', this.config.apiEndpoint + api);
        console.log('value:', value);
      }
      return this.http.post(this.config.apiEndpoint + api + '/', value, this.jwt())
                    .map(res => res.json())
                    .catch(this.handleError.bind(this));
  }

    public postResponseAdmin(api, value): any {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (this.consoleStatus) {
        console.log('POST to ' + api + ':', this.config.apiEndpoint + api);
        console.log('value:', value);
      }
      return this.http.post(this.config.apiEndpoint + api + '/', value, this.jwt())
                    .map(res => res)
                    .catch(this.handleError.bind(this));
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
    console.log('ERROR:', errMsg);
    return Observable.throw(errMsg);
  }
}
