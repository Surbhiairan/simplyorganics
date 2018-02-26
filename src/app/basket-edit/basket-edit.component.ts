import { Component, AfterViewInit, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-basket-edit',
  templateUrl: './basket-edit.component.html',
  styleUrls: ['./basket-edit.component.css']
})

export class BasketEditComponent implements OnInit {

  loading = false;

  products =[
    {"id":1,
     "name": "Organic Sugar",
     "basket": "false"
    },
    {"id":2,
     "name": "Organic Rice",
     "basket": "false"},
    {"id":3,
     "name": "Organic Flour",
     "basket": "false"}
    ];

  results: Product[];
  serviceArray;
  fieldName = '';
  public form: FormGroup; // our model driven form

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private alertService: AlertService,
  public productService: ProductService ) {

    this.getBasketProduct();
    this.form = this.formBuilder.group({});
    
     
       this.fieldName = 'selectedproducts';
      this.form.addControl(this.fieldName, new FormArray([]) );

       this.serviceArray = <FormArray>this.form.controls[this.fieldName];
      // for(let product of this.results)
      // {
      //   serviceArray.push(new FormControl(product) );
      // }
      // this.form.get(fieldName).patchValue((this.results).map(x => (this.results).indexOf(x) > -1));
    
  }

  formAssignValues () {
    for(let product of this.results)
    {
      this.serviceArray.push(new FormControl(product) );
    }
    this.form.get(this.fieldName).patchValue((this.results).map(x => (this.results).indexOf(x) > -1));
  
  }

  ngOnInit() {

   


  }

  convertToValue(key: string, category) {
    return this.form.value[key].map((x, i) => x && category[i]).filter(x => !!x);
  }

  onSubmit()
  {
    let result = Object.assign({}, this.form.value);
    let field_name = "selectedproducts";
    result[field_name] = this.convertToValue(field_name, this.results);
    
    // for(let industry_category of this.industries)
    // {
    //   let field_name = industry_category.value+"_service_categories";
    //   result[field_name] = this.convertToValue(field_name, industry_category.service_categories);
    // }
    this.productService.saveBasketProducts(result).subscribe(res => {
      if(res){
        console.log(res,"ressssssssssssssssssssssss");
        //this.results = data['login successful'];
        //user = JSON.parse(res._body);

      }
     
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
  });
    console.log(result);
  }

  getBasketProduct(): void {
    this.productService.getBasketProduct()
      .subscribe(results =>  {
                  this.results = results['results'];
                  console.log(results, "measures");
                  this.formAssignValues();
                },
                 err => {console.log(err);
                }
      );
      
  }

}
