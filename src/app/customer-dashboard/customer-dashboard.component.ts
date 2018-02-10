import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {


  public currentUser : any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    // this.userService.getCurrentUser().then(profile => this.currentUser = profile)
    //     .catch(() => this.currentUser = {});
  }

  

}
