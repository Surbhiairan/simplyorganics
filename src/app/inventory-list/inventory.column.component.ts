import {Component, Input} from '@angular/core';
import {InventoryDatatableComponent} from './inventory.datatable.component';
 
@Component({
  selector: 'inventory-column',
  template: ``,
 
})
export class InventoryColumnComponent {
	@Input() value;
	@Input() header;
 
	constructor(table: InventoryDatatableComponent) {
    	   table.addColumn(this)
  	}
}