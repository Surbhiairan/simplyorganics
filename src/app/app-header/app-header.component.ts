import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Customer} from '../models/customer';

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
  constructor() { }

  
  ngOnInit() {
    this.result =  JSON.parse(localStorage.getItem('currentUser'));
    
  }

}
