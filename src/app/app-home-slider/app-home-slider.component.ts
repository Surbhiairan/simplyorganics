import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-app-home-slider',
  templateUrl: './app-home-slider.component.html',
  encapsulation: ViewEncapsulation.None,  
  styleUrls: ['./app-home-slider.component.css',
  '../../assets/css/ecommerce/style.css',
 // '../../assets/css/ecommerce/revolution-slider.css'
]
})
export class AppHomeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
