import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'home-app',
  templateUrl: './dashboard_2.component.html',
})
export class Dashboard2Component implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
      
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/dashboard_2_demo.js";
        this.elementRef.nativeElement.appendChild(s);

    }

}
