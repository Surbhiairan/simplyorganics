import { CartItem } from './cart-item';

export class ShoppingCart {
    public items: CartItem[] = new Array<CartItem>();
    public deliveryOptionId: Number;
    public grossTotal: Number = 0;
    public deliveryTotal: Number = 0;
    public itemsTotal = 0;

    public updateFrom(src: ShoppingCart) {
        this.items = src.items;
        this.deliveryOptionId = src.deliveryOptionId;
        this.grossTotal = src.grossTotal;
        this.deliveryTotal = src.deliveryTotal;
        this.itemsTotal = src.itemsTotal;
    }
}
