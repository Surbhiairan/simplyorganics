import { Component, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

import {UIService} from '../../services/ui.service';
import {AuthenticationService} from '../../../authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
//   template: `
//   <div class="container" >
//       <div class="content">
//           <span>Congratulations, you have successfully logged in!!</span>
//           <br />
//           <a (click)="logout()" href="#">Click Here to logout</a>
//       </div>
//   </div>
// `,
  providers: [UIService, AuthenticationService]
})
export class FullLayout implements AfterViewInit {

	  constructor(
	    public UIService: UIService, 
      private router: Router,
      private _service:AuthenticationService
    ) { }

    ngOnInit(){
      this._service.checkCredentials();
  }

  logout() {
      this._service.logout();
  }
    ngAfterViewInit() {
        this.UIService.activate();
        this.router.events.subscribe(event => {
          if(event instanceof NavigationStart) {
            this.UIService.activate();
          }
        });
    }

}
