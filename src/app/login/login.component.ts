import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../assets/css/pages/auth-dark.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    private http: HttpClient, private formBuilder: FormBuilder,
    private _service: AuthenticationService) { }

  results: Customer;
  form: FormGroup;

  // for localstorage login---------------------------------------------------------------
  public user = User;
  public errorMsg = '';

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  login(model: User) {

    /* console.log('loginnnnnnnnnnn-----------------------------');
    console.log(model, 'model-------------------------'); */

    this._service.login(model).subscribe(res => {
      if (res) {
        console.log(res, 'ressssssssssssssssssssssss');
        // this.results = data['login successful'];
        /* console.log('resultsssss', res._body);
        console.log('resultsssss', JSON.parse(res._body));
        console.log(JSON.parse(res._body).login); */
        this.results = JSON.parse(res._body).login;
        // user = JSON.parse(res._body);

        localStorage.setItem('currentUser', JSON.stringify(this.results));

      }
      if (this.results.role === 'admin') { this.router.navigate(['/admin/profile']); }
      if (this.results.role === 'customer') { this.router.navigate(['/customer/profile']); }
      if (this.results.role === 'salesperson') { this.router.navigate(['/salesperson/profile']); }
    });
  }

  fbLogin(): void {
    // Make the HTTP request:
    this.http.get('http://localhost:3002/api/auth/facebook').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(this.results);
    });
  }
  // fbLogin() {

  //   this.userService.fbLogin().then(() => {
  //     console.log('User has been logged in');
  //     this.router.navigate(['/dashboard']);
  //   });  }

}
