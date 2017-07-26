import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/bufferTime';

let idleCount = 0;

@Injectable()
export class AuthService {

  public logged: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: Http,
    private router: Router,

    @Inject(APP_CONFIG) private config: IAppConfig,

    ) { }

    login(email_or_username: string, password: string) {
        return this.http.post(this.config.apiEndpoint + 'api-token-auth/',
                              { email_or_username: email_or_username, password: password },
                              this.jwt())
            .map((response: Response) => {
            const user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(user);
                this.activity();
              //  this.profileService.setPerson(user.person);
            }
            console.log('Вы авторизованы!');
          //  if (user.person.user.is_staff) { location.href = 'profile'; } else { location.href = '/'; }
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.logged.emit(false);
        this.router.navigate(['login']);
        //
    }

    register(user: any) {
        return this.http.post(this.config.apiEndpoint + 'register/', user, this.jwt())
                          .map((response: Response) => {
                            // response.json()
                            console.log('Вы зарегистрированы!');
                          });
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
    }

    refreshToken() {
        const currentUser = this.getCurrentUser();
        if (currentUser == null) {
            currentUser.token = null;
        }
        return this.http.post(
                            this.config.apiEndpoint + 'api-token-refresh/',
                            { token: currentUser.token},
                            this.jwt())
                     .map(
                         (response: Response) => {
                            const user = response.json();
                     });
    }

    refreshAction() {
      this.refreshToken().subscribe(
                (data) => {
                console.log("токен обновлен");
                },
                (err) => {
                  console.error("токен не обновлен");
                  this.logout();
                });
    }

  activity() {
    this.refreshAction();
    Observable.fromEvent(document, 'click').bufferTime(60000).subscribe((clickBuffer) => {
      console.log(idleCount);
        if (clickBuffer.length > 0) {
          idleCount = 0;
          this.refreshAction();
        } else {
          idleCount++;
        }
        if (idleCount > 59) {
          this.logout();
        }

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
