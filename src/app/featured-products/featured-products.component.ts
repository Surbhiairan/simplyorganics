import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css',
              '../../assets/css/ecommerce/owl.carousel.css',
            '../../assets/css/ecommerce/owl.theme.css']
})
export class FeaturedProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
