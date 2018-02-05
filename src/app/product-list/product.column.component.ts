import {Component, Input} from '@angular/core';
import {ProductDatatableComponent} from './product.datatable.component';
 
@Component({
  selector: 'product-column',
  template: ``,
 
})
export class ProductColumnComponent {
	@Input() value;
	@Input() header;
 
	constructor(table: ProductDatatableComponent) {
    	   table.addColumn(this);
  	}
}