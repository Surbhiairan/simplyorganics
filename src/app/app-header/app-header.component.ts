import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Customer} from '../models/customer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app-header.component.css', 
              '../../assets/css/ecommerce/style.css'
  ]
})
export class AppHeaderComponent implements OnInit {

  result: Customer;
  constructor(private _router: Router) { }

  isLoggedIn: boolean = false;
  // when you login successful, the isLoggedIn set to true
  profileRoute : string;

  ngOnInit() {
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

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._router.navigate(['/']);
  }
}
