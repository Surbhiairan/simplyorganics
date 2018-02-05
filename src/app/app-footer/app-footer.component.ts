import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  encapsulation: ViewEncapsulation.None,  
  styleUrls: ['./app-footer.component.css',
  '../../assets/css/ecommerce/style.css']
})
export class AppFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
