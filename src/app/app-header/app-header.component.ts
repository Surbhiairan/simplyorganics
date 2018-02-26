import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { Currency } from '../models/currency';
import { CurrencyService } from '../currency.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app-header.component.css', 
              '../../assets/css/ecommerce/style.css'
  ]
})
export class AppHeaderComponent implements OnInit {

  constructor( 
    private auth: AuthenticationService, 
    private _router: Router,
    private currencyService: CurrencyService) { }

  result: Customer;
  currencies: Currency[];
  isLoggedIn: boolean = false;
  // when you login successful, the isLoggedIn set to true
  profileRoute : string;
  //selectedCurrency = this.currencies[1];
  

  ngOnInit() {
    this.getCurrencies();

    this.result =  JSON.parse(localStorage.getItem('currentUser'));
    if(this.result){
      this.isLoggedIn =true;

      if(this.result.role==='admin')
      this.profileRoute = '/admin/profile';
      if(this.result.role==='customer')
      this.profileRoute = '/customer/profile';
      if(this.result.role==='salesperson')
      this.profileRoute = '/salesperson/profile';
  }
  }

  public onChange(event): void {  // event will give you full breif of action
    const currency = event.target.value;
    localStorage.setItem("currency",currency);
    console.log(currency, "selected currency========================================");
  }

  public changeCurrency(currentCurrency){
    localStorage.setItem("currency",currentCurrency);
    console.log(currentCurrency, "selected current currency========================================");
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies()
      .subscribe(currencies =>  {this.currencies = currencies['results'], console.log(currencies, "currencies")},
                 err => {console.log(err);}
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._router.navigate(['/']);
  }
}
