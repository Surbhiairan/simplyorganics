import { Component, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './ecommerce_products_list.component.html',
})

export class EcommerceProdutsList implements AfterViewInit{
	ngAfterViewInit() {
		$('#example-table').DataTable({
		  pageLength: 10,
		  fixedHeader: true,
		  dom: '<"html5buttons"B>lTfgitp',
		  buttons: [
		      {extend: 'copy'},
		      {extend: 'csv'},
		      {extend: 'excel', title: 'ExampleFile'},
		      {extend: 'pdf', title: 'ExampleFile'},
		      {extend: 'print',}
		  ]
		});
	}
}
