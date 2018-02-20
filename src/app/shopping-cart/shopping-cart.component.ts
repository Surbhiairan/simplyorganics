import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem} from '../models/cart-item';
import { LocalStorageServie } from '../services/storage.service';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public obProducts: Observable<Product[]>;
  public obCart: Observable<ShoppingCart>;
  public itemCount: number;
  public products: Product[];
  // public cart: ShoppingCart[];
  public cartItems: ICartItemWithProduct[];


  private cartSubscription: Subscription;

  constructor(private productsService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              public data: LocalStorageServie
) { }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  ngOnInit() {
    // this.products = this.productsService.all();
    this.obCart = this.shoppingCartService.get();
    this.cartSubscription = this.obCart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.getPPQList().subscribe((products) => {
        this.products = products['results'];
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.ppq_id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.prod_price * item.quantity
            };
          });
        console.log('items in cart', this.cartItems);
      });
    });

     console.log('cart', this.obCart);
    console.log('total items', this.itemCount);
    // console.log('items in cart', this.cartItems);
  }

  viewCart(cartItems): void {
    this.data.cartStorage = cartItems;
    this.router.navigate(['viewcart']);
  }

}
