import { Input, Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'adminhome-app',
  templateUrl: './adminhome.component.html',
})
export class AdminHomeComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) { }
  
    ngAfterViewInit(): void {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/dashboard_1_demo.js";
        this.elementRef.nativeElement.appendChild(s);
    }

}
