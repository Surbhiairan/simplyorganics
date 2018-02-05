import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Product } from '../models/product';
import { Inventory } from '../models/inventory';
import { Store } from '../models/store';

import { InventoryService } from '../services/inventory.service';
import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {

  public inventoryForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public stores: Store[];
  public products: Product[];
  public inventory: Inventory[];

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private storeService: StoreService

  ) { } // form builder simplify form initialization

  ngOnInit() {
    this.getProduct();
    this.getStore();
    // the short way
    this.inventoryForm = this._fb.group({
      prod_id: [this.products],
      store_id: [this.stores],
      product_quantity: [''],
    });
  }

  getProduct(): void {
    this.productService.getProduct()
      .subscribe(products => {
          this.products = products['results'],
          console.log('products', products);
        },
      err => {
        console.log(err);
      }
    );
  }

  getStore(): void {
    this.storeService.getStore()
      .subscribe(stores => {
        this.stores = stores['results'],
        console.log('Stores', stores);
       },
      err => { console.log(err); }
      );
  }

  save(model: Inventory, isValid: boolean) {
    console.log(model, isValid);
    this.submitted = true; // set form submit to true

    const body = model;
    console.log('body-----', body);

    // calling inventory service addInventory to push the data to database.
    this.inventoryService.addInventory(body).subscribe(
      inventory => {
        this.inventory.push(body);
        console.log('inventory pushed');
      },
      err => { console.log(err); }
    );
  }
}
