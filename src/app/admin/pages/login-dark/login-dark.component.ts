import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login-dark',
  templateUrl: './login-dark.component.html',
  styleUrls: ['../../../../assets/css/pages/auth-dark.css']
})
export class LoginDarkComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $('#login-form').validate({
        errorClass:"help-block",
        rules: {
            email: {required:true,email:true},
            password: {required:true}
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
