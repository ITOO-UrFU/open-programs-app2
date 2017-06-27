import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

    registerUrl = 'http://10.16.208.154:8080/api/v11/register/';

    create(user: any) {
        return this.http.post(this.registerUrl, user, this.jwt())
                          .map((response: Response) => {
                            // response.json()
                            console.log('Вы зарегистрированы!');
                          });
    }

    private jwt() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
