import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Country } from '../models/country';
import { CountryService } from '../services/country.service';
import { CityService } from '../services/city.service';
import { StateService } from '../services/state.service';
import { City } from '../models/city';
import { State } from '../models/state';
import {Order} from '../models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public deliveryForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  results: object;
  public countries: Country[];
  public states: State[];
  public cities: City[];
  public selectedIndex: number;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private countryService: CountryService,
    private cityService: CityService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('local storage', localStorage.getItem('currentUser'));
    this.results = JSON.parse(localStorage.getItem('currentUser'));
    if (this.results) {
      this.router.navigate(['checkout/delivery']);
    } else {
      console.log('Please log in');
    }
  }
}
