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
        return profile;
      })
      .catch((error: any) => {
        console.error("Error retrieving profile!");
        return Observable.throw(error);
      });
  }

  public GetUserTrajectories(){
    return this.http.get(this.config.apiEndpoint + 'get_trajectories/', this.authService.jwt())
      .map(response => {
        const trajectories = response.json();
        return trajectories;
      })
      .catch((error: any) => {
        console.error("Error retrieving trajectories!");
        return Observable.throw(error);
      });
  }

  public GetPrograms() {
    return this.http.get(this.config.apiEndpoint + 'programs/', this.authService.jwt())
      .map(response => {
        const programs = response.json();
        return programs;
      })
      .catch((error: any) => {
        console.error("Error retrieving programs!");
        return Observable.throw(error);
      });
  }


  public setPerson(value: any) {
    person = value;
    alert(person.sex);
  }

}
