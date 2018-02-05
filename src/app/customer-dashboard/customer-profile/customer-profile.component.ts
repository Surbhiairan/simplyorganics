import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
//import { User} from '../../authentication.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  //@Input() results: Customer[];
  
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  myForm: FormGroup;  
  //customerName: string;
  user_id: number;
  f_name: string;
  l_name: string;
  addedBy: string;
  address: string;
  city_name: string;
  contact: string;
  country_name: string;
  dateAdded: string;
  email: string;
  landmark: string;
  pincode: string;
  state_name: string;

  constructor() { }

  ngOnInit() {
    console.log('local storage',localStorage.getItem('currentUser'));
  }


}
