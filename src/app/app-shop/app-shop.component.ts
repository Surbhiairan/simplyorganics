import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';

import { Product, ProdQuant } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { LocalStorageServie } from '../services/storage.service';

export class quantPrice{
  quantity: string;
  price: string;
}

export class finalProduct{
  name : String;
  qp: quantPrice[];

}

@Component({
  selector: 'app-shop',
  templateUrl: './app-shop.component.html',
  styleUrls: ['./app-shop.component.css']
})


export class AppShopComponent implements OnInit {

  public products: Product[];
  public catProduct: Product[] = [];
  //public finalProducts : finalProduct[] = new Array<finalProduct>();
  public prodQuants: ProdQuant[] =[];
  public  jsonObj = [];
  //public item = {};
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private data: LocalStorageServie
  ) { }
  value: Number;
  fullpath: string;
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
    let j;
    this.productService.getProduct()
      .subscribe(products => {
        this.products = products['results'],
          console.log('products', products);
        this.products.forEach( product => {
          console.log('single product', product);
          //product.imagepath = "../../"+product.imagepath;
          if (product.cat_id === value) {
            catProduct[i] = product;
            i++;
            //this.fullpath = '../../'+ product.image_url;
          }
          console.log('catProduct', catProduct);
          this.data.productStorage = catProduct;
          console.log('on shop page----', catProduct);
        });

        //show all products with same name in one box
        console.log(catProduct,"catproducttttttttt-----------------------------");
        
        for(let product of catProduct){
          this.productService.getProductPriceQuantity(product.prod_id)
            .subscribe(prodQuants => {
              this.prodQuants = prodQuants['results'],
              console.log("prod quant==============", prodQuants);
              var item = {};
              item["product"]=product;
              item["prodQuants"]=prodQuants;
              this.jsonObj.push(item);
            });
        }

        console.log("jsonobj=============================================",this.jsonObj);
        
        
        // let count = 0;
        // let j =0;
        // for( let product of catProduct){
        //   for( let p of catProduct){
        //     if(product.prod_name === p.prod_name){
              
        //       var f = new finalProduct();
        //       f.name = product.prod_name;
        //       f.qp[j].price = product.price;
        //       f.qp[j].quantity = product.quantity;

        //       this.finalProducts.push(finalProduct);
        //       this.finalProducts[count].name = product.prod_name;
        //       this.finalProducts[count].qp[j].price = product.price;
        //       this.finalProducts[count].qp[j].quantity = product.quantity;
        //     }
        //       j++;
        //   }
        //   count++;
        // }
        //console.log("final products----------------------------", this.finalProducts);
      },
      err => {
        console.log(err);
      });
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }
}
