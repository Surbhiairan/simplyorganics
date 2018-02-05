import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  templateUrl: './datatable.component.html',
})
export class Datatable implements AfterViewInit {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        $('#example-table').DataTable({
          pageLength: 10,
          fixedHeader: true,
          responsive: true,
          dom: '<"html5buttons"B>lTfgitp',
          buttons: [
              'copyHtml5',
              'excelHtml5',
              'csvHtml5',
              'print',
              'colvis'
          ],
          "ajax": './assets/demo/data/table_data.json',
          "columns": [
              { "data": "name" },
              { "data": "office" },
              { "data": "extn" },
              { "data": "start_date" },
              { "data": "salary" }
          ],
          language: {
            buttons: {
              colvis: '<i class="ti-view-grid"></i>'
            }
          }
        });
    }

}
