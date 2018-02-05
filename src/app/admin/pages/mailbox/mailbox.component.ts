import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './mailbox.component.html',
  styleUrls: ['../../../../assets/css/pages/mailbox.css'],
})
export class Mailbox implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
      
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "./assets/js/scripts/mailbox.js";
        this.elementRef.nativeElement.appendChild(s);

    }

}
