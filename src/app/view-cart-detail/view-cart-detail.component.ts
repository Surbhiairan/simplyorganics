import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';

import { ShoppingCart } from '../models/shopping-cart';
import { StorageService, LocalStorageServie } from '../services/storage.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

const CART_KEY = 'cart';


@Component({
  selector: 'app-view-cart-detail',
  templateUrl: './view-cart-detail.component.html',
  styleUrls: ['./view-cart-detail.component.css']
})
export class ViewCartDetailComponent implements OnInit {
   cart: ShoppingCart;
   private storage: Storage;
   public obCart: Observable<ShoppingCart>;
    value= 0;
    c = 1;

   constructor(private storageService: StorageService,
              private data: LocalStorageServie,
              private shoppingCartService: ShoppingCartService,
              private router: Router
            ) {}

  ngOnInit() {
    this.obCart = this.shoppingCartService.get();
    console.log('obCart-----', this.obCart);
    this.cart = this.data.cartStorage;
    console.log('item in cart view', this.cart);
  }

  updateCount(product: Product, value: number) {
    this.value = +value;
    console.log('value of count', this.value);
    this.shoppingCartService.addItem(product, this.value);

  }

  backToShop() {
    this.router.navigate(['home']);
  }

  checkout() {
    this.router.navigate(['checkout']);
  }

}
