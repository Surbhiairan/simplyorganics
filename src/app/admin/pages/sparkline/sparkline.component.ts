import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
})
export class SparklineComponent implements OnInit {

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/sparkline-demo.js";
        this.elementRef.nativeElement.appendChild(s);
    }

}
