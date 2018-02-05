import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Salesperson } from '../models/salesperson';

@Component({
  selector: 'app-salesperson-detail',
  templateUrl: './salesperson-detail.component.html',
  styleUrls: ['./salesperson-detail.component.css']
})
export class SalespersonDetailComponent implements OnInit {

  @Input() results: Salesperson[];

  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  salespersonForm: FormGroup;
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

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.salespersonForm = fb.group({
      user_id: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      addedBy: ['', Validators.required],
      address: ['', Validators.required],
      city_name: ['', Validators.required],
      contact: ['', Validators.required],
      country_name: ['', Validators.required],
      dateAdded: ['', Validators.required],
      email: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required],
      state_name: ['', Validators.required],
    });
  }
  value: String;
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params, "paramssssssssss");
      this.value = params.userid; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
    });

    // Make the HTTP request:
    this.http.get('http://localhost:3000/customerdetail?userid=' + this.value).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(data['results'].f_name);
      console.log(this.results[0].state_name);
      this.salespersonForm.patchValue({ user_id: this.results[0].user_id });
      this.salespersonForm.patchValue({ f_name: this.results[0].f_name });
      this.salespersonForm.patchValue({ l_name: this.results[0].l_name });
      this.salespersonForm.patchValue({ contact: this.results[0].contact });
      this.salespersonForm.patchValue({ address: this.results[0].address });
      this.salespersonForm.patchValue({ landmark: this.results[0].landmark });
      this.salespersonForm.patchValue({ city_name: this.results[0].city_name });
      this.salespersonForm.patchValue({ state_name: this.results[0].state_name });
      this.salespersonForm.patchValue({ country_name: this.results[0].country_name });
      this.salespersonForm.patchValue({ pincode: this.results[0].pincode });
      this.salespersonForm.patchValue({ email: this.results[0].email });
      this.salespersonForm.patchValue({ dateAdded: this.results[0].dateAdded });
      this.salespersonForm.patchValue({ addedBy: this.results[0].addedBy });
    });
  }

  update(model: Salesperson, isValid: boolean) {

    console.log(model, 'customer modelllllllllllllllllllll');

    console.log(model, isValid);
    this.submitted = true; // set form submit to true
    const body = model;

    console.log('body-----', body);

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
