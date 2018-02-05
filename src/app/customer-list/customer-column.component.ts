import {Component, Input} from '@angular/core';
import {CustomerDatatableComponent} from './customer-datatable.component';
 
@Component({
  selector: 'customer-column',
  template: ``,
 
})
export class CustomerColumnComponent {
	@Input() value;
	@Input() header;
 
	constructor(table: CustomerDatatableComponent) {
    	   table.addColumn(this)
  	}
}