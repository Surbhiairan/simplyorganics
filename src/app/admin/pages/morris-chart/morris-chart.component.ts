import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-morris-chart',
  templateUrl: './morris-chart.component.html',
})
export class MorrisChartComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "./assets/js/scripts/charts_morris_demo.js";
	this.elementRef.nativeElement.appendChild(s);
  }

}
