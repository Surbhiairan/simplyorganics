import { Component } from '@angular/core';
import {UIService} from '../../services/ui.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: '[admin-header]',
  templateUrl: './app-header.component.html',
  providers: [UIService]
})
export class AppHeader {

    constructor(
        public UIService: UIService, 
    ) { }

}
