import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageServie } from '../services/storage.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-app-product-details',
  templateUrl: './app-product-details.component.html',
  styleUrls: ['./app-product-details.component.css',
  '../../assets/css/ecommerce/style.css'
]
})
export class AppProductDetailsComponent implements OnInit {

  constructor( private route: ActivatedRoute,
                private data: LocalStorageServie) { }

  value: number;
  products: Product[];
  product: Product;

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params, 'paramssssssssss');
      this.value = + params.product_id; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
      this.products = this.data.productStorage;
      console.log('on product detail page', this.products);
      this.products.forEach(product => {
        console.log('single product', product);
        if (product.prod_id === this.value) {
          // this.product = product;
          this.product = product;
        }
      });
    });
  }

}
