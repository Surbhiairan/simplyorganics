import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
      $("[name='timeline1-option']").change(function(){
	      +this.value ? $('.timeline-1').addClass('center-orientation') : $('.timeline-1').removeClass('center-orientation');
	  });
	  $("[name='timeline2-option']").change(function(){
	      +this.value ? $('.timeline-2').addClass('center-orientation') : $('.timeline-2').removeClass('center-orientation');
	  });
  }

}
