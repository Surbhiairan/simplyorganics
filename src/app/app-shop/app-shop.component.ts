import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { LocalStorageServie } from '../services/storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './app-shop.component.html',
  styleUrls: ['./app-shop.component.css']
})
export class AppShopComponent implements OnInit {

  public products: Product[];
  public catProduct: Product[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private data: LocalStorageServie
  ) { }
  value: Number;
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params, 'paramssssssssss');
      this.value = + params.cat_id; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
    });
    this.getProduct(this.value, this.catProduct);

  }
  getProduct( value, catProduct): void {
    let i = 0;
    this.productService.getProduct()
      .subscribe(products => {
        this.products = products['results'],
          console.log('products', products);
        this.products.forEach( product => {
          console.log('single product', product);
          if (product.cat_id === value) {
            catProduct[i] = product;
            i++;
          }
          console.log('catProduct', catProduct);
          this.data.productStorage = catProduct;
          console.log('on shop page----', catProduct);
        });
      },
      err => {
        console.log(err);
      });
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }
}
