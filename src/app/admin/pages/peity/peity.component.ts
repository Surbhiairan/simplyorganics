import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './peity.component.html',
})
export class Peity implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {

      $("span.pie").peity("pie", {
          fill: ['#18C5A9', '#d1d5d8', '#ffffff']
      });
  
      $(".line").peity("line",{
          fill: '#18C5A9',
          stroke:'#16b59b',
      });
  
      $(".bar").peity("bar", {
          fill: ["#18C5A9", "#d1d5d8"]
      });
  
      $(".bar_dashboard").peity("bar", {
          fill: ["#18C5A9", "#d1d5d8"],
          width:100
      });
  
      $(".donut").peity("donut", {
          fill: ["#18C5A9", "#d1d5d8"]
      });
  
      var updatingChart = $(".updating-chart").peity("line", { fill: '#18C5A9',stroke:'#16b59b', width: 64 })
  
      setInterval(function() {
          var random = Math.round(Math.random() * 10)
          var values = updatingChart.text().split(",")
          values.shift()
          values.push(random)
  
          updatingChart
              .text(values.join(","))
              .change()
      }, 1000);    

    }

}
