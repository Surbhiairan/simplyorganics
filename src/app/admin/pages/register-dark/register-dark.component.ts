import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-register-dark',
  templateUrl: './register-dark.component.html',
  styleUrls: ['../../../../assets/css/pages/auth-dark.css']
})
export class RegisterDarkComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

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
  ngOnInit(): void {
      $('body').addClass('bg-silver');
  }
  ngOnDestroy() { 
      $('body').removeClass('bg-silver');
  }
  
}
