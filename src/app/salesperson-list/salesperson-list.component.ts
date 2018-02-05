import { Component, AfterViewInit, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var jQuery:any;
declare var $:any;

@Component({
 // templateUrl: './product-list.component.html',
 template: `<salesperson-datatable [dataset]=results>
 <salesperson-column [value]="'user_id'" [header]="'Id'"></salesperson-column>
 <salesperson-column [value]="'f_name'" [header]="'Fisrt Name'"></salesperson-column>
 <salesperson-column [value]="'l_name'" [header]="'Last Name'"></salesperson-column>
 <salesperson-column [value]="'email'" [header]="'Email'"></salesperson-column>
 </salesperson-datatable>
`,
})


export class SalespersonListComponent implements OnInit, AfterViewInit{

  results: object[];
  
   // Inject HttpClient into your component or service.
   constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('http://localhost:3000/salespersonlist').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(this.results);
    });
  }

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
