import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Store } from '../models/store';
import { Product } from '../models/product';
import { ProductService} from '../services/product.service';
import { StoreService } from '../services/store.service';
import { InventoryService} from '../services/inventory.service';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public inventoryForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public stores: Store[];
  public products: Product[];
  public inventory: Inventory[];

  constructor(private _fb: FormBuilder,
              private http: HttpClient,
              private inventoryService: InventoryService,
              private productService: ProductService,
              private storeService: StoreService
            ) { }
  results: object[];

  ngOnInit() {
    this.getProduct();
    this.getStore();
    this.inventoryForm = this._fb.group({
      productName: [this.products, [<any>Validators.required]],
      productQuantity: 1 ,
      moveTo: [this.stores],
      moveFrom: [this.stores]
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
  update(model: Inventory, isValid: boolean) {
    console.log(model, isValid);
    this.submitted = true; // set form submit to true

    const body = model;
    console.log('body-----', body);

    // calling inventory service addInventory to push the data to database.
    this.inventoryService.updateInventory(body).subscribe(
      inventory => {
        console.log('inventory pushed');
      },
      err => { console.log(err); }
    );
  }

}


