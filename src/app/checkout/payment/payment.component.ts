import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


import { ShoppingCart } from '../../models/shopping-cart';
import { StorageService, LocalStorageServie } from '../../services/storage.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { DeliveryDetails } from '../../models/delivery-details';
import { OrderService } from '../../services/order.service';

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
  public completeOrder: any = {};
  // public order: Order = new Order;
  results: Object;
 // public order: FormGroup; // our model driven form
  // public orderItem: OrderItem[] = new Array<OrderItem>();

  constructor(
    private _fb: FormBuilder,
    private storageService: StorageService,
    private data: LocalStorageServie,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
    // private router: Router
  ) {}

  ngOnInit() {
    let i = 0;
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

    this.results = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user-----', this.results);

    this.completeOrder.o_amount = this.obcartSub.grossTotal;
    this.completeOrder.saddress = this.deliveryDetail.address;
    this.completeOrder.scity = this.deliveryDetail.city.city_id;
    this.completeOrder.scountry = this.deliveryDetail.country.country_id;
    this.completeOrder.sstate = this.deliveryDetail.state.state_id;
    this.completeOrder.slandmark = this.deliveryDetail.landmark;
    this.completeOrder.spincode = this.deliveryDetail.pincode;
    this.completeOrder.sphone = this.deliveryDetail.contact;
    this.completeOrder.sname = this.deliveryDetail.sname;
    this.completeOrder.slname = this.deliveryDetail.slname;
    this.completeOrder.paymethod = this.deliveryDetail.paymethod;
    this.completeOrder.billingDetails = this.results;
    this.completeOrder.cart = this.cart;
    console.log('complete order', this.completeOrder);
    sessionStorage.setItem('Order', JSON.stringify(this.completeOrder));
     this.placeOrder(this.completeOrder);
  }

  // payment method lso need to be included in body. That will come onblur event of select method type.
  // After that placeorder method will be moved to onblur.
  placeOrder(body) {
    this.orderService.placeOrder(body).subscribe( order => {
      order.push(body);
      console.log('order placed------------');
    });
    
  }

}
