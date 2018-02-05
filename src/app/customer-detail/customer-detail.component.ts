import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Customer} from '../models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() results: Customer[];
  
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

  constructor(fb: FormBuilder, 
    private route: ActivatedRoute,
    private http: HttpClient
   ) {  
    this.myForm = fb.group({  
      user_id: ['', Validators.required] ,
      f_name: ['', Validators.required] ,
      l_name: ['', Validators.required]  ,
      addedBy: ['', Validators.required]  ,
      address: ['', Validators.required]  ,
      city_name: ['', Validators.required]  ,
      contact: ['', Validators.required],
      country_name: ['', Validators.required] ,
      dateAdded: ['', Validators.required],
      email: ['', Validators.required]  ,
      landmark: ['', Validators.required],
      pincode: ['', Validators.required]  ,
      state_name: ['', Validators.required]  ,
    
      //'customerName':  ['', Validators.required]  
    });  
  }
   value: String;
  // constructor( private http: HttpClient,private route: ActivatedRoute ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params,"paramssssssssss");
      this.value = params.userid; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
    });

    // Make the HTTP request:
    this.http.get('http://localhost:3000/customerdetail?userid='+this.value).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(data['results'].f_name);
      console.log(this.results[0].state_name);
      this.myForm.patchValue({user_id: this.results[0].user_id});
      this.myForm.patchValue({f_name: this.results[0].f_name});
      this.myForm.patchValue({l_name: this.results[0].l_name});
      this.myForm.patchValue({contact: this.results[0].contact});
      this.myForm.patchValue({address: this.results[0].address});
      this.myForm.patchValue({landmark: this.results[0].landmark});
      this.myForm.patchValue({city_name: this.results[0].city_name});
      this.myForm.patchValue({state_name: this.results[0].state_name});
      this.myForm.patchValue({country_name: this.results[0].country_name});
      this.myForm.patchValue({pincode: this.results[0].pincode});
      this.myForm.patchValue({email: this.results[0].email});
      this.myForm.patchValue({dateAdded: this.results[0].dateAdded});
      this.myForm.patchValue({addedBy: this.results[0].addedBy});
  });
}

update(model: Customer, isValid: boolean) {
  
  console.log(model,"customer modelllllllllllllllllllll")
  // f_name
  // l_name
  // addedBy
  // address
  // city_name
  // contact
  // country_name
  // dateAdded
  // email
  // landmark
  // pincode
  // state_name

      console.log(model, isValid);
      this.submitted = true; // set form submit to true
      
      // var body = "f_name=" + model.f_name + "&l_name=" + model.l_name + "&contact="+model.contact+"&email="+model.email+"&address="+model.address+"&landmark="+model.landmark;
    
      var body = model;
      
      console.log("body-----", body);
      // var bodySt = JSON.stringify(body);
      // console.log("body-----", bodySt);
      
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
      this.http
        .post('http://localhost:3000/customerupdate',
          body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
          })
          .subscribe(data => {
                alert('ok');
          }, error => {
              console.log(error);
          });
  
       
       
      }
  

}
