import { Component, AfterViewInit, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Product} from '../models/product';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent {

  results: Product[];
  value: String;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  // public queryForm: FormGroup;
  prod_id: number;
  prod_name: string;
  prod_desc: string;
  prod_measure: string;
  prod_cat: string;
  prod_quant_total: number;
  prod_price_dollar: number;
  prod_price_rupee: number;
  prod_price_dirham: number;
  prod_in_store: number;
  prod_in_warehouse: number;
  prod_in_van: number;

   // Inject HttpClient into your component or service.
   constructor(
     private http: HttpClient,
     private route: ActivatedRoute,
     private fb: FormBuilder) {
      this.myForm = fb.group({
        prod_id: ['', Validators.required],
        prod_name: ['', Validators.required],
        prod_desc: ['', Validators.required],
        prod_measure: ['', Validators.required],
        prod_cat: ['', Validators.required],
        prod_quant_total: ['', Validators.required],
        prod_price_dollar: ['', Validators.required],
        prod_price_rupee: ['', Validators.required],
        prod_price_dirham: ['', Validators.required],
        prod_in_store: ['', Validators.required],
        prod_in_warehouse: ['', Validators.required],
        prod_in_van: ['', Validators.required]
      });
    }
  ngOnInit(): void {

    // get URL parameters
    this.route.params.subscribe(params => {
      console.log(params,"paramssssssssss");
      this.value = params.productid; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
    });

    // Make the HTTP request:
    this.http.get('http://localhost:3000/productdetail?productid=' + this.value).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(this.results[0],"results");
      console.log(this.results[0].prod_desc);
      this.myForm.patchValue({prod_id: this.results[0].prod_id});
      this.myForm.patchValue({prod_name: this.results[0].prod_name});
      this.myForm.patchValue({prod_desc: this.results[0].prod_desc});
      this.myForm.patchValue({prod_measure: this.results[0].prod_measure});
      this.myForm.patchValue({prod_cat: this.results[0].cat_id});
      /* this.myForm.patchValue({prod_quant_total: this.results[0].quant});
      this.myForm.patchValue({prod_price_dollar: this.results[0].price_dollar});
      this.myForm.patchValue({prod_price_rupee: this.results[0].price_rupee});
      this.myForm.patchValue({prod_price_dirham: this.results[0].price_dirham});
      this.myForm.patchValue({prod_in_store: this.results[0].store});
      this.myForm.patchValue({prod_in_warehouse: this.results[0].warehouse});
      this.myForm.patchValue({prod_in_van: this.results[0].van}); */
    });

  // this.myForm.setValue({
  //   name:    this.results,
  // });

  }

}

