import { Component, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './ecommerce_products_edit.component.html',
})

export class EcommerceProdutsEdit implements AfterViewInit{
	ngAfterViewInit() {
	  $('.date').datepicker({
	      todayBtn: "linked",
	      keyboardNavigation: false,
	      forceParse: false,
	      calendarWeeks: true,
	      autoclose: true
	  });
	}
}
