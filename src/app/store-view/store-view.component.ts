import { Component, AfterViewInit, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './store-view.component.html',
 /* template: `<store-datatable [dataset]=results>
                  <store-column [value]="'store_id'" [header]="'Id'"></store-column>
                  <store-column [value]="'name'" [header]="'Name'"></store-column>
                  <store-column [value]="'description'" [header]="'Description'"></store-column>
                  <store-column [value]="'address'" [header]="'Address'"></store-column> 
                  <store-column [value]="'pincode'" [header]="'Pin Code'"></store-column>
                  <store-column [value]="'city'" [header]="'City'"></store-column>
                  <store-column [value]="'state'" [header]="'State'"></store-column>
                  <store-column [value]="'country'" [header]="'Country'"></store-column>                  
                  <store-column [value]="'contact'" [header]="'Contact'"></store-column>
                  <store-column [value]="'date'" [header]="'Date'"></store-column>
                  
             </store-datatable>
             `, */
})


export class StoreViewComponent implements OnInit, AfterViewInit{

  results: object[];
  
   // Inject HttpClient into your component or service.
   constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('http://localhost:3000/storeview').subscribe(data => {
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
          {extend: 'print', }
      ]
    });
  }
}

