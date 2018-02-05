import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    private http: HttpClient, private formBuilder: FormBuilder,
    private _service:AuthenticationService) { }

  results: object[];
  form: FormGroup;

  //for localstorage login---------------------------------------------------------------
  public user = User;
  public errorMsg = '';

  login(model: User) {

    console.log("loginnnnnnnnnnn-----------------------------");
    console.log(model,"model-------------------------");
  
    this._service.login(model).subscribe(res => {
      if(res){
        console.log(res,"ressssssssssssssssssssssss");
        //this.results = data['login successful'];
        console.log('resultsssss', res._body);
        console.log('resultsssss',JSON.parse(res._body));
        console.log(JSON.parse(res._body).login);
        this.results = JSON.parse(res._body).login;
        //user = JSON.parse(res._body);
        localStorage.setItem('currentUser',JSON.stringify(this.results));
      }
      this.router.navigate(['/customer/profile']);
    })


      // if(!this._service.login(model)){
      //   console.log("anjalijfkjdflfjalkdjfalkfjd")
      //     this.errorMsg = 'Failed to login';
      // }
      // else{
      //   console.log("in elsehkjsdfhsdjlfdljlfhdf");
      // this.router.navigate(['/customer/profile']);}
  }
  //--------------------------------------------------------------------------------------
  ngOnInit() {
    
        this.form = this.formBuilder.group({
          username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
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
  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    // this.submitted = true;
    // this.errorDiagnostic = null;

    this.userService.login(this.form.value).subscribe(data => {
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.log(error);
      // this.submitted = false;
      // this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }
  // fbLogin() {

  //   this.userService.fbLogin().then(() => {
  //     console.log('User has been logged in');
  //     this.router.navigate(['/dashboard']);
  //   });  }

}
