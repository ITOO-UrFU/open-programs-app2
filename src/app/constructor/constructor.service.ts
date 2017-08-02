// Angular
import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app.config';

// Classes
import { APP_CONFIG, IAppConfig } from '../app.config';

// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ConstructorService {

  public consoleStatus: boolean = false; // вынести настройки в отдельный файл

  constructor(
    private http: Http,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig,

    ) { }

  // Получение элементов Открытой образовательной программы

  public getElements(type: string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.config.apiEndpoint + type);
    }
    return this.http.get(this.config.apiEndpoint + type +'/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  public getElementsBySlug(type: string, slug: string):any {
    if (this.consoleStatus) {
      console.log("[URL API]: ", this.config.apiEndpoint + type + '/' + slug);
    }
    return this.http.get(this.config.apiEndpoint + type + '/' + slug + '/?format=json')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  public postResponse(api, value): any {
      const headers = new Headers({ 'Content-Type': 'application/json' });
     // const options = new RequestOptions({ headers: headers });
      return this.http.post(this.config.apiEndpoint + api + '/', value, this.authService.jwt())
                    .map( res => res.json() )
                    .catch( this.handleError );
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
