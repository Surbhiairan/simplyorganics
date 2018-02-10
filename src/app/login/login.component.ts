import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { AlertService } from '../services/alert.service';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/auth-dark.css']
})

export class LoginComponent implements OnInit {

  returnUrl: string;
  loading = false;
  results: Customer;
  form: FormGroup;
  //for localstorage login---------------------------------------------------------------
  public user = User;
  public errorMsg = '';
  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private _service:AuthenticationService,
    private alertService: AlertService) { }



  //--------------------------------------------------------------------------------------
  ngOnInit() {
    // reset login status
    this._service.logout();
    
   // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

   $('body').addClass('bg-silver');
       this.form = this.formBuilder.group({
         username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
         password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
       });
  }

  // ngOnInit() {
  //   this.form = this.formBuilder.group({
  //     username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
  //     password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
  //   });
  // }

  login(model: User) {

    /* console.log('loginnnnnnnnnnn-----------------------------');
    console.log(model, 'model-------------------------'); */

    this._service.login(model).subscribe(res => {
      console.log("in login component------------res", res.login);
      console.log("res.login.tokennnnnnnnnnnnnnnnnnnnnnnnnn", res.login.token);
      if(res && res.login.token){
        console.log(res,"ressssssssssssssssssssssss");
        //this.results = data['login successful'];
        console.log('resultsssss', res._body);

        console.log('resultsssss',JSON.parse(res._body));
        console.log(JSON.parse(res._body).login);

        this.results = JSON.parse(res._body).login;
        // user = JSON.parse(res._body);
        localStorage.setItem('currentUser',JSON.stringify(this.results));
        if(this.results.role === 'admin')
        this.router.navigate(['/admin']);
        if(this.results.role === 'customer')
        this.router.navigate(['/customer']);
        if(this.results.role === 'salesperson')
        this.router.navigate(['/salesperson']);
      }
      
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
  });
  


      // if(!this._service.login(model)){
      //   console.log("anjalijfkjdflfjalkdjfalkfjd")
      //     this.errorMsg = 'Failed to login';
      // }
      // else{
      //   console.log("in elsehkjsdfhsdjlfdljlfhdf");
      // this.router.navigate(['/customer/profile']);}
  }

  signup(model: User) {
    
        console.log("signup-----------------------------");
        console.log(model,"model-------------------------");
      
        this._service.signup(model).subscribe(res => {
          if(res){
            console.log(res,"ressssssssssssssssssssssss");
            //this.results = data['login successful'];
            console.log('resultsssss', res._body);
            console.log('resultsssss',JSON.parse(res._body));
            console.log(JSON.parse(res._body).signup);
            this.results = JSON.parse(res._body).signup;
            //user = JSON.parse(res._body);
    
            localStorage.setItem('currentUser',JSON.stringify(this.results));
    
          }
          
          this.router.navigate(['/home']);

          // if(this.results.role === 'admin')
          // this.router.navigate(['/admin/profile']);
          // if(this.results.role === 'customer')
          // this.router.navigate(['/customer/profile']);
          // if(this.results.role === 'salesperson')
          // this.router.navigate(['/salesperson/profile']);
        })
    
    
          // if(!this._service.login(model)){
          //   console.log("anjalijfkjdflfjalkdjfalkfjd")
          //     this.errorMsg = 'Failed to login';
          // }
          // else{
          //   console.log("in elsehkjsdfhsdjlfdljlfhdf");
          // this.router.navigate(['/customer/profile']);}
      }

  
  fbLogin() {
    // Make the HTTP request:
    console.log("inside fb loginnnnnnnnnnn---------------------------");
    this.http.get('http://localhost:3002/api/auth/facebook').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data,"facebook login dataaaaaaaaaa");
      this.results = data['results'];
      console.log(this.results);
    });
  }

ngOnDestroy() { 
    $('body').removeClass('bg-silver');
}

ngAfterViewInit() {
  $('#register-form').validate({
      errorClass:"help-block",
      rules: {
          first_name: {required:true,minlength:2},
          last_name: {required:true,minlength:2},
          email: {required:true,email:true},
          password: {required:true,confirmed:true},
          password_confirmation: {equalTo:'password'}
      },
      highlight:function(e){$(e).closest(".form-group").addClass("has-error")},
      unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},
  });
}
}
