import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ShoppingCart } from '../../models/shopping-cart';
import { StorageService, LocalStorageServie } from '../../services/storage.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { DeliveryDetails} from '../../models/delivery-details';
import { Order } from '../../models/order';


@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {
  cart: ShoppingCart;
  private storage: Storage;
  public obCart: Observable<ShoppingCart>;
  public obcartSub: ShoppingCart;
  deliveryDetail: DeliveryDetails;
  public grossTotal: number;
  public order: Order;
  s_gst: number;
  c_gst: number;

  constructor(
    private storageService: StorageService,
    private data: LocalStorageServie,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obCart = this.shoppingCartService.get();
    console.log('obCart-----', this.obCart);
    // to extract gross total amount 
    this.obCart.subscribe(obcart => {
        this.obcartSub = obcart;
        console.log('sub----------', this.obcartSub);
      });
    this.cart = this.data.cartStorage;
    console.log('item in order review', this.data.cartStorage);
    console.log('item in order review', this.cart);
    this.deliveryDetail = JSON.parse(sessionStorage.getItem('delivery_detail'));
    console.log('delivery details', this.deliveryDetail);
    if (this.deliveryDetail && this.deliveryDetail.country && this.deliveryDetail.country.country_id !== 101 ) {
      // international delivery
    }
    if (this.deliveryDetail && this.deliveryDetail.state && this.deliveryDetail.state.state_id !== 21) {
      // apply i_gst = 2.5%
    }
    this.grossTotal = this.obcartSub.grossTotal;
    console.log('grossTotal', this.grossTotal);
    // this.order.o_amount = this.grossTotal;
    this.s_gst = this.c_gst = (this.grossTotal * 0.025) ;
    console.log('gst--------', this.s_gst, this.c_gst);
    // this.c_gst = this.grossTotal * 2.5 % ;
  }

  next() {
    console.log('next called');
    this.router.navigate(['checkout/payment']);
  }

}
