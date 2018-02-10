
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer } from './models/customer';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { User} from './models/user'
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map'; 

// export class User {
//   constructor(
//     public email: string,
//     public password: string) { }
// }


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
 
  results: Customer;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    //private http: HttpClient,
    private messageService: MessageService,
    private http: HttpClient){}
    

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');

  }

  login (user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("in auth login");
    console.log("bodyyyyyyyyyyyy", body);
    return this.http.post('http://localhost:3002/api/login', body, httpOptions)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  signup(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3002/api/signup', body, httpOptions)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  // login(user) {
  //   console.log(user,"in auth service-----------------------------------------")
  //   const authenticatedUser = users.find(u => u.email === user.username);
  //   var body = user;
  //   // Make the HTTP request:
  //   console.log("body--------------",body);
  //   this.http.post('http://localhost:3002/api/login',
  //   body, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json')
  //   }).subscribe(data => {
  //     // Read the result field from the JSON response.
  //     this.results = data['login successful'];
  //     console.log(this.results,'this.results----------------');
      
  // });

  // if(this.results){
  //   localStorage.setItem('currentuser', JSON.stringify(this.results));
  //   return true;
  // }
  // return false;
  //   // if (authenticatedUser) {
  //   //   localStorage.setItem('user', JSON.stringify(authenticatedUser));
  //   //   console.log("user---------------------------------",user);
  //   //   console.log(authenticatedUser,"authenticated user------------------------");
  //   //   // if(authenticatedUser.role === 'admin')
  //   //   // this._router.navigate(['/admin']);
  //   //   // if(authenticatedUser.role === 'customer')
  //   //   // this._router.navigate(['/customer']);
  //   //   // if(authenticatedUser.role === 'salesperson')
  //   //   // this._router.navigate(['/salesperson']);
  //   //   return true;
  //   // }
  //   // return false;

  // }

   checkCredentials( ) {
    if (localStorage.getItem('user') === null) {
        this._router.navigate(['Login']);
    }
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
