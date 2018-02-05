import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  templateUrl: './chartjs.component.html',
})
export class ChartJS implements OnInit {
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/chartjs_demo.js";
        this.elementRef.nativeElement.appendChild(s);
    }
}
