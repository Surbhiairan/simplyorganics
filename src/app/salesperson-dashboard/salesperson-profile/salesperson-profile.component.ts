import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
//import { User} from '../../authentication.service';
import { Customer} from '../../models/customer';

@Component({
  selector: 'app-salesperson-profile',
  templateUrl: './salesperson-profile.component.html',
  styleUrls: ['./salesperson-profile.component.css']
})
export class SalespersonProfileComponent implements OnInit {
  @Input() results: Customer;
  
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  myForm: FormGroup;  
  //customerName: string;
  user_id: number;
  f_name: string;
  l_name: string;
  addedBy: string;
  address: string;
  city: string;
  contact: string;
  country: string;
  dateAdded: string;
  email: string;
  landmark: string;
  pincode: string;
  state: string;

  constructor(fb: FormBuilder, 
    private route: ActivatedRoute,
    private http: HttpClient) {

      this.myForm = fb.group({  
        user_id: ['', Validators.required] ,
        f_name: ['', Validators.required] ,
        l_name: ['', Validators.required]  ,
        addedBy: ['', Validators.required]  ,
        address: ['', Validators.required]  ,
        city: ['', Validators.required]  ,
        contact: ['', Validators.required],
        country: ['', Validators.required] ,
        dateAdded: ['', Validators.required],
        email: ['', Validators.required]  ,
        landmark: ['', Validators.required],
        pincode: ['', Validators.required]  ,
        state: ['', Validators.required]  ,
      });  
     }

  ngOnInit() {
    console.log('local storage',localStorage.getItem('currentUser'));
    this.results =  JSON.parse(localStorage.getItem('currentUser'));
    this.myForm.patchValue({user_id: this.results.user_id});
    this.myForm.patchValue({f_name: this.results.f_name});
    this.myForm.patchValue({l_name: this.results.l_name});
    this.myForm.patchValue({contact: this.results.contact});
    this.myForm.patchValue({address: this.results.address});
    this.myForm.patchValue({landmark: this.results.landmark});
    this.myForm.patchValue({city_name: this.results.city});
    this.myForm.patchValue({state_name: this.results.state});
    this.myForm.patchValue({country_name: this.results.country});
    this.myForm.patchValue({pincode: this.results.pincode});
    this.myForm.patchValue({email: this.results.email});
    this.myForm.patchValue({dateAdded: this.results.dateAdded});
    this.myForm.patchValue({addedBy: this.results.addedBy});
  }


}
