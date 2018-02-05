import { Component, OnInit, OnDestroy } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['../../../../assets/css/pages/error-pages.css']
})
export class Error404Component implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
      $('body').addClass('bg-silver-100');
  }
  ngOnDestroy() { 
      $('body').removeClass('bg-silver-100');
  }

}
