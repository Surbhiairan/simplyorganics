import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './mail.view.component.html',
  styleUrls: ['../../../../assets/css/pages/mailbox.css'],
})
export class MailView implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {

    }

}
