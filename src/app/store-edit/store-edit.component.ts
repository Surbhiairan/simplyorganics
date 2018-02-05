import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
// import {Hero} from '../../../models/product.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import {Store} from '../models/store';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent {


    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
  
    constructor(private _fb: FormBuilder, private http: HttpClient) { } // form builder simplify form initialization
    results: object[];
    
    ngOnInit() {
        // the short way
      this.myForm = this._fb.group({
        store_id:  [''] ,
        name:  [''] ,
        description:  [''] ,
        address:  [''] ,
        pincode:  [''] ,
        city:  [''] ,
        state:  [''] ,
        country: [''] ,
        contact: [''] ,
        date: [''],
    });
    }
  
    save(model: Store, isValid: boolean) {
  
      console.log(model, isValid);
      this.submitted = true; // set form submit to true
      
      var body = model;
      console.log("body-----", body);
      var bodySt = JSON.stringify(body);
      console.log("body-----", bodySt);
      
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
      this.http
        .post('http://localhost:3000/storeedit',
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
  
