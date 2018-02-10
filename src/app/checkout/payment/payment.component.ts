import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


import { ShoppingCart } from '../../models/shopping-cart';
import { StorageService, LocalStorageServie } from '../../services/storage.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { DeliveryDetails } from '../../models/delivery-details';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cart: ShoppingCart[];
  private storage: Storage;
  public obCart: Observable<ShoppingCart>;
  public obcartSub: ShoppingCart;
  deliveryDetail: DeliveryDetails;
  public grossTotal: number;
  public order: Order[] = [];
  // public order: FormGroup; // our model driven form
  public orderItem: OrderItem;

  constructor(
    private _fb: FormBuilder,
    private storageService: StorageService,
    private data: LocalStorageServie,
    private shoppingCartService: ShoppingCartService,
    // private router: Router
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
    // console.log('item in order review', this.data.cartStorage);
    console.log('item in order review', this.cart);
    this.deliveryDetail = JSON.parse(sessionStorage.getItem('delivery_detail'));
    console.log('delivery details', this.deliveryDetail);

    /* this.order[0].o_amount = this.obcartSub.grossTotal;
    this.order[0].saddress = this.deliveryDetail.address;
    this.order[0].scity = this.deliveryDetail.city.city_id;
    this.order[0].scountry = this.deliveryDetail.country.country_id;
    this.order[0].sstate = this.deliveryDetail.state.state_id;
    this.order[0].slandmark = this.deliveryDetail.landmark;
    this.order[0].spincode = this.deliveryDetail.pincode;
    this.order[0].sphone = this.deliveryDetail.contact;
    this.order[0].sname = this.deliveryDetail.sname;
    this.order[0].slname = this.deliveryDetail.slname;

    localStorage.setItem('order', JSON.stringify(this.order));

    this.cart.forEach( item => {
      this.orderItem.prod_id = item.items[0].productId;
      this.orderItem.p_quantity = item.items[0].quantity;
      this.orderItem.subtotal = item.itemsTotal;
    }); */

    console.log('orderItem-----', this.orderItem);

  }

}
