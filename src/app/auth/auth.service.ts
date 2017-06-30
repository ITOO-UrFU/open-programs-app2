import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class AuthService {

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
            location.reload();
            });
    }

    logout() {
        location.reload();
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }

    register(user: any) {
        return this.http.post(this.config.apiEndpoint + 'register/', user, this.jwt())
                          .map((response: Response) => {
                            // response.json()
                            console.log('Вы зарегистрированы!');
                          });
    }

    getCurrentUser(){
      console.log(JSON.parse(localStorage.getItem('currentUser')));
      return JSON.parse(localStorage.getItem('currentUser'));
    }

    refreshToken(){
        let currentToken = '';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            currentToken = currentUser.token;
        }
        return this.http.post(this.config.apiEndpoint + 'api-token-refresh/',
                              { token: currentToken},
                              this.jwt())
            .map((response: Response) => {
              const user = response.json();
              console.log('Токен обновлен!');
            });
    }

    jwt() {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append('Authorization', currentUser.token);
        }
        return new RequestOptions({ headers: headers });
    }

}
