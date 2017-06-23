import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  loginURL = 'http://10.16.208.154:8080/api/v11/api-token-auth/';

  constructor(
    private http: Http,
    private router: Router)
  { }

    login( email_or_username: string, password: string) {
        return this.http.post(this.loginURL, { email_or_username: email_or_username, password: password }, this.login_jwt())
            .map((response: Response) => {
            const user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
              }
            });
    }

    private login_jwt() {
            const headers = new Headers({ 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
    }

}
