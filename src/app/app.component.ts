import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '../app/models/store';
import { Category } from '../app/models/category';
import {City} from '../app/models/city';
import {State} from '../app/models/state';
import {Country} from '../app/models/country';
import {Measure} from '../app/models/measure';
import {Currency} from '../app/models/currency';
import {Quantity} from '../app/models/quantity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  results: object[];

  stores: Store[];
  categories: Category[];
  measures: Measure[];
  quantities: Quantity[];
  currencies: Currency[];
  cities: City[];
  states: State[];
  countries: Country[];

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    // Make the HTTP request:
    /* this.http.get('http://localhost:3000/storeview').subscribe(data => {
      // Read the result field from the JSON response.
      this.stores = data['results'];
      console.log(this.stores);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/catlist').subscribe(data => {
      // Read the result field from the JSON response.
      this.categories = data['results'];
      console.log(this.categories);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/measlist').subscribe(data => {
      // Read the result field from the JSON response.
      this.measures = data['results'];
      console.log(this.measures);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/quantlist').subscribe(data => {
      // Read the result field from the JSON response.
      this.quantities = data['results'];
      console.log(this.quantities);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/currlist').subscribe(data => {
      // Read the result field from the JSON response.
      this.currencies = data['results'];
      console.log(this.currencies);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/citylist').subscribe(data => {
      // Read the result field from the JSON response.
      this.cities = data['results'];
      console.log(this.cities);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/statelist').subscribe(data => {
      // Read the result field from the JSON response.
      this.states = data['results'];
      console.log(this.states);
    });

     // Make the HTTP request:
     this.http.get('http://localhost:3000/countrylist').subscribe(data => {
      // Read the result field from the JSON response.
      this.countries = data['results'];
      console.log(this.countries);
    }); */
  }
  
}
