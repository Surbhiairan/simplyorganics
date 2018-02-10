import { Component } from '@angular/core';
import {UIService} from '../../services/ui.service';
import {Router} from '@angular/router';

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
        private _router: Router
    ) { }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._router.navigate(['/']);
    }

}
