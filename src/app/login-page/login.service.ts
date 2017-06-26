import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private router: Router,
    @Inject(APP_CONFIG) private config: IAppConfig,

    )
  { }

    login(email_or_username: string, password: string) {
        return this.http.post(this.config.apiEndpoint + 'api-token-auth/',
                              { email_or_username: email_or_username, password: password },
                              this.jwt())
            .map((response: Response) => {
            const user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            console.log('Вы авторизованы!', user);
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        // window.location.reload();
        this.router.navigate(['login']);
    }

    getCurrentUser(){
      console.log(JSON.parse(localStorage.getItem('currentUser')));
      return JSON.parse(localStorage.getItem('currentUser')); // || JSON.parse('{person: null}');
    }

    private jwt() {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append('Authorization', currentUser.token);
        }
        return new RequestOptions({ headers: headers });
    }

}
