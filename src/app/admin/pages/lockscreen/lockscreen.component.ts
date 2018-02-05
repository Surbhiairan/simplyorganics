import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $('#lock-form').validate({
        errorClass:"help-block",
        rules: {
            password: {required:true}
        },
        highlight:function(e){$(e).closest(".form-group").addClass("has-error")},
        unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},
        errorPlacement:function(e,r){
            var i=$(r).parents(".input-group, .check-list");
            i.length ? i.after(e) : r.after(e)
        },
    });
  }
  ngOnInit(): void {
      $('body').css({'background-color':'#2CC4CB', 'background-image':'linear-gradient(135deg,#2CC4CB,#18C5A9)'});
  }
  ngOnDestroy() { 
      $('body').css({'background-color':'', 'background-image':''});
  }

}
