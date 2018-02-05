import { Component } from '@angular/core';

import {UIService} from '../../services/ui.service';

@Component({
  selector: '[app-theme-config]',
  templateUrl: './app-theme-config.component.html',
  providers: [UIService]
})
export class AppThemeConfig {
	 constructor(public UIService: UIService, ) { }
}
