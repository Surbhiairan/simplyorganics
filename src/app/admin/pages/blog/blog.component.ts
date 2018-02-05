import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './blog.component.html',
})

export class Blog implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {

      $('#daterange').daterangepicker();

    }

}
