import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../../assets/css/pages/auth-light.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $('#forgot-form').validate({
        errorClass:"help-block",
        rules: {
            email: {required:true,email:true},
        },
        highlight:function(e){$(e).closest(".form-group").addClass("has-error")},
        unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},
    });
  }
  ngOnInit(): void {
      $('body').css({'background-color':'#2CC4CB', 'background-image':'linear-gradient(135deg,#2CC4CB,#18C5A9)'});
  }
  ngOnDestroy() { 
      $('body').css({'background-color':'', 'background-image':''});
  }
  
}
