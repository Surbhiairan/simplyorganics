import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
//import { User} from '../../authentication.service';
import { Customer} from '../../models/customer';

@Component({
  selector: 'app-salesperson-customers',
  templateUrl: './salesperson-customers.component.html',
  styleUrls: ['./salesperson-customers.component.css']
})
export class SalespersonCustomersComponent implements OnInit {
  @Input() results: Customer;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    //data:  Object[];
    //to get id of logged in customer and get information of his customers
    console.log('local storage',localStorage.getItem('currentUser'));
    this.results =  JSON.parse(localStorage.getItem('currentUser'));

    //call api to fetch his customer details
    // Make the HTTP request:
    this.http.get('http://localhost:3002/api/salespersoncustomer?id=' + this.results.user_id).subscribe(data => {
      // Read the result field from the JSON response.

      this.results = data['data'];
      console.log(this.results[0],"results");
      console.log(this.results[0]);
      
      // this.myForm.patchValue({prod_id: this.results[0].prod_id});
      // this.myForm.patchValue({prod_name: this.results[0].prod_name});
      // this.myForm.patchValue({prod_desc: this.results[0].prod_desc});
      // this.myForm.patchValue({prod_measure: this.results[0].prod_measure});
      // this.myForm.patchValue({prod_cat: this.results[0].cat_id});
      /* this.myForm.patchValue({prod_quant_total: this.results[0].quant});
      this.myForm.patchValue({prod_price_dollar: this.results[0].price_dollar});
      this.myForm.patchValue({prod_price_rupee: this.results[0].price_rupee});
      this.myForm.patchValue({prod_price_dirham: this.results[0].price_dirham});
      this.myForm.patchValue({prod_in_store: this.results[0].store});
      this.myForm.patchValue({prod_in_warehouse: this.results[0].warehouse});
      this.myForm.patchValue({prod_in_van: this.results[0].van}); */
    });

  }

}
