import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../models/product';

@Component({
  selector: 'app-app-product-details',
  templateUrl: './app-product-details.component.html',
  styleUrls: ['./app-product-details.component.css',
  '../../assets/css/ecommerce/style.css',
  // '../../assets/css/ecommerce/animate.css',
  // '../../assets/css/ecommerce/blog.css',
  //'../../assets/css/ecommerce/bootstrap.min.css',
  // '../../assets/css/ecommerce/flexslider.css',
  // '../../assets/css/ecommerce/jquery-ui.css',
  // '../../assets/css/ecommerce/quick_view_popup.css',
  // '../../assets/css/ecommerce/animate.css',
  // '../../assets/css/ecommerce/simple-line-icons.css',
]
})
export class AppProductDetailsComponent implements OnInit {

  results: Product[];
  value: String;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {

    // get URL parameters
    this.route.params.subscribe(params => {
      console.log(params,"paramssssssssss");
      this.value = params.productid; // --> Name must match wanted parameter
      console.log(this.value, 'valueeeeeeeeeeee');
    });

    // Make the HTTP request:
    this.http.get('http://localhost:3000/productdetail?productid=' + this.value).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(this.results[0],"results");
      console.log(this.results[0].prod_desc);
    });

  }

}
