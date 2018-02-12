import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
// import {Hero} from '../../../models/product.model';
import {Product} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions, Http, Response } from '@angular/http';
import {MeasureService} from '../measure.service';
import {Measure} from '../models/measure';
import {CurrencyService} from '../currency.service';
import {Currency} from '../models/currency';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Quantity } from '../models/quantity';
import { QuantityService } from '../services/quantity.service';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
//define the constant url we would be uploading to.
const URL = 'http://localhost:3002/api/imageupload';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{


  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public measures: Measure[];
  public currencies: Currency[];
  private categories: Category[];
  private quantities: Quantity[];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private _fb: FormBuilder, 
    private http: HttpClient,
    private measureService: MeasureService,
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private quantityService: QuantityService,
    private el: ElementRef
  ) { } // form builder simplify form initialization
  results: object[];
  
  ngOnInit() {

    this.getMeasures();
    this.getCurrencies();
    this.getCategories();
    this.getQuantities();
      // the short way
    this.myForm = this._fb.group({
      prod_id: [''],
      prod_name: [''] ,
      prod_desc: [''] ,
      prod_measure: [this.measures] ,
      prod_currency: [this.currencies],
      prod_category: [this.categories],
      prod_quantity: [this.quantities],
      prod_price: ['']
  });

  //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
  this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
  //overide the onCompleteItem property of the uploader so we are 
  //able to deal with the server response.
  this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
       console.log("ImageUpload:uploaded:", item, status, response);
   };

  }

  getMeasures(): void {
    this.measureService.getMeasures()
      .subscribe(measures =>  {this.measures = measures['results'], console.log(measures, "measures")},
                 err => {console.log(err);
                }
      );
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies()
      .subscribe(currencies =>  {this.currencies = currencies['results'], console.log(currencies, "currencies")},
                 err => {console.log(err);}
      );
  }

  getCategories(): void {
    this.categoryService.getCategory()
      .subscribe(categories =>  {this.categories = categories['results'], console.log(categories, "categories")},
                 err => {console.log(err);}
      );
  }

  getQuantities(): void {
    this.quantityService.getQuantities()
      .subscribe(quantities =>  {this.quantities = quantities['results'], console.log(quantities, "categories")},
                 err => {console.log(err);}
      );
  }
  //the function which handles the file upload without using a plugin.
  upload(model, isValid)  {
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('photo', inputEl.files.item(0));
                formData.append('prod_name', model.prod_name);
                formData.append('prod_desc', model.prod_desc);
                formData.append('prod_category', model.prod_category);
                formData.append('prod_currency', model.prod_currency);
                formData.append('prod_price', model.prod_price);
                formData.append('prod_quantity', model.prod_quantity);
                formData.append('prod_measure', model.prod_measure);
                console.log('formdataaaaaaaaaaaaaaaaaaaaaa',formData);
            //call the angular http method
            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL, formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);

                },
                (error) => alert(error))
          }
       }


  // onFileChange(event) {
  //  let reader = new FileReader();
  //  if(event.target.files && event.target.files.length > 0) {
  //    let file = event.target.files[0];
  //    reader.readAsDataURL(file);
  //    reader.onload = () => {
  //      this.myForm.get('photo').setValue({
  //        filename: file.name,
  //        filetype: file.type,
  //        value: reader.result.split(',')[1]
  //      })
  //    };
  //  }
  // }
    
  save(model: Product, isValid: boolean) {
    this.upload( model, isValid);
  //   console.log(model, isValid);
  //   this.submitted = true; // set form submit to true
    
  //   var body = model;
  //   console.log("body-----", body);
  //   /* var bodySt = JSON.stringify(body);
  //   console.log("body-----", bodySt); */
    
  //  /*  var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded'); */
    
  //   this.http
  //     .post('http://localhost:3002/api/imageupload',
  //       body, {
  //         headers: new HttpHeaders().set('Content-Type', 'application/json' )
  //       })
  //       .subscribe(data => {
  //             alert('ok');
  //       }, error => {
  //           console.log(error);
  //       });
    
    }

}
