import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { AlertService } from '../services/alert.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../assets/css/pages/auth-dark.css']
})

export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    private http: HttpClient, private formBuilder: FormBuilder,
    private _service:AuthenticationService,
    private alertService: AlertService) { }

  results: Customer;
  form: FormGroup;
  loading = false;
  //for localstorage login---------------------------------------------------------------
  public user = User;
  public errorMsg = '';


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
            this.router.navigate(['/home']);
          }
          
          

          // if(this.results.role === 'admin')
          // this.router.navigate(['/admin/profile']);
          // if(this.results.role === 'customer')
          // this.router.navigate(['/customer/profile']);
          // if(this.results.role === 'salesperson')
          // this.router.navigate(['/salesperson/profile']);
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

  ngOnInit() {
    $('body').addClass('bg-silver');
        this.form = this.formBuilder.group({
          username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
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
