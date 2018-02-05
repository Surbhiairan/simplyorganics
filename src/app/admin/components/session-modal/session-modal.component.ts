import { Component } from '@angular/core';
import {UIService} from '../../services/ui.service';

@Component({
  selector: '[session-modal]',
  templateUrl: './session-modal.component.html'
})
export class SessionModal {
	constructor(public UIService: UIService, ) { }
}
