import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
// Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';

let person: any;

@Injectable()
export class ProfileService {

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: Http,
    private authService: AuthService,
  ) { }

  public getProfile() {
    console.log(this.config.apiEndpoint + 'get_user');
    return this.http.post(this.config.apiEndpoint + 'get_user/', {}, this.authService.jwt())
      .map(response => {
        const profile = response.json();
        console.log("profile: ", response);
      })
  }

  public setPerson(value: any) {
    person = value;
    alert(person.sex);
    //this.authService.jwt()
  }

}
