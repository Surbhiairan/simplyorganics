import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
declare const FB:any;

@Injectable()
export class UserService {

  constructor(private http: AuthHttp) {
    // FB.init({
    //   appId      : '531833047215910',
    //   status     : false, // the SDK will attempt to get info about the current user immediately after init
    //   cookie     : false,  // enable cookies to allow the server to access
    //   // the session
    //   xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
    //   version    : 'v2.8' // use graph api version 2.5
    // });
  }

  login(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3002/api/login', body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  // fbLogin() {
  //   return new Promise((resolve, reject) => {
  //     FB.login(result => {
  //       if (result.authResponse) {
  //         return this.http.post(`http://localhost:3000/api/v1/auth/facebook`, {access_token: result.authResponse.accessToken})
  //             .toPromise()
  //             .then(response => {
  //               var token = response.headers.get('x-auth-token');
  //               if (token) {
  //                 localStorage.setItem('id_token', token);
  //               }
  //               resolve(response.json());
  //             })
  //             .catch(() => reject());
  //       } else {
  //         reject();
  //       }
  //     }, {scope: 'public_profile,email'})
  //   });
  // }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/api/v1/auth/me`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}