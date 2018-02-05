import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './mail.compose.component.html',
  styleUrls: ['../../../../assets/css/pages/mailbox.css'],
})
export class MailCompose implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {

      $('.tagsinput').tagsinput();
      $('#summernote').summernote();
      $('.note-popover').css({'display': 'none'});

    }

}
