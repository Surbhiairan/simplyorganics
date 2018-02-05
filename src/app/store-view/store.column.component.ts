import {Component, Input} from '@angular/core';
import {StoreDatatableComponent} from './store.datatable.component';
 
@Component({
  selector: 'store-column',
  template: ``,
 
})
export class StoreColumnComponent {
	@Input() value;
	@Input() header;
 
	constructor(table: StoreDatatableComponent) {
    	   table.addColumn(this)
  	}
}