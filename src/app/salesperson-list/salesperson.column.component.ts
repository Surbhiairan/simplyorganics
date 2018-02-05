import {Component, Input} from '@angular/core';
import { SalespersonDatatableComponent} from './salesperson.datatable.component';
 
@Component({
  selector: 'salesperson-column',
  template: ``,
 
})
export class SalespersonColumnComponent {
	@Input() value;
	@Input() header;
 
	constructor(table: SalespersonDatatableComponent) {
    	   table.addColumn(this)
  	}
}