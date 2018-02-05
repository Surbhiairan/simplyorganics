import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
})
export class WidgetsComponent implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
      
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/widgets-demo.js";
        this.elementRef.nativeElement.appendChild(s);

    }

}
