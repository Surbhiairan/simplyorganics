import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router} from '@angular/router';

import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';
import { StateService } from '../../services/state.service';
import { PaymentService } from '../../services/paymentMethod.service';
import { City } from '../../models/city';
import { State } from '../../models/state';
import { Order } from '../../models/order';
import { PaymentMethod } from '../../models/payment-method';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {
  public deliveryForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  results: object;
  public countries: Country[];
  public states: State[];
  public cities: City[];
  public payment: PaymentMethod;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private countryService: CountryService,
    private cityService: CityService,
    private stateService: StateService,
    private paymentMethod: PaymentService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('local storage', localStorage.getItem('currentUser'));
    this.results = JSON.parse(localStorage.getItem('currentUser'));
    if (this.results) {
      this.getCountries();
      this.getPayment();
      console.log('then only proceed');
      this.deliveryForm = this._fb.group({
        sname: '',
        slname: '',
        contact: '',
        address: '',
        landmark: '',
        country: [this.countries],
        state: [this.states],
        city: [],
        pincode: '',
        paymethod: [this.payment]

      });

    } else {
      console.log('Please log in');
    }
  }

  getPayment() {
    this.paymentMethod.getPayment().subscribe(data => {
      this.payment = data['results'];
      console.log('payment----------', this.payment);
    });
  }

  getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => {
        this.countries = countries['results'],
          console.log('countries', this.countries);
      },
      err => {
        console.log(err);
      }
      );
  }

  getState(country) {
    this.stateService.getStates(country)
      .subscribe(states => {
        this.states = states['results'],
          console.log('countries', this.states);
        // this.deliveryForm.controls['state'].setValue(this.states);
      },
      err => {
        console.log(err);
      }
      );
  }

  getCity(state) {
    this.cityService.getCities(state)
      .subscribe(cities => {
        this.cities = cities['results'],
          console.log('cities', this.cities);
        this.deliveryForm.controls['city'].setValue(this.cities);

      },
      err => {
        console.log(err);
      }
      );
  }

  onCountryChange(country) {
    console.log('country--------', country.country_id);
    this.getState(country.country_id);
  }

  onStateChange(state) {
    console.log('State----------', state);
    console.log('get city called');
    this.getCity(state.state_id);

  }

  save(model: Order, isValid: boolean) {
    console.log('model---------', model);
    sessionStorage.setItem('delivery_detail', JSON.stringify(model));
    this.router.navigate(['checkout/payment']);

  }

}
