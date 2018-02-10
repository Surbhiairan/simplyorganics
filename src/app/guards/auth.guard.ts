//http://jasonwatmore.com tutorial

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


// import { Injectable }       from '@angular/core';
// import {
//     CanActivate, Router,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot,
//     Route
// }                           from '@angular/router';
// import { UserService } from '../services/user.service';

// @Injectable()
// export class AuthGuard implements CanActivate {

//     constructor(private userService: UserService, private router: Router) {}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         return this.checkLogin();
//     }

//     checkLogin(): Promise<boolean> {
//         return new Promise((resolve, reject) => {
//             this.userService.isLoggedIn().then(() => {
//                 resolve(true);
//             }).catch(() => {
//                 this.router.navigate(['/login']);
//                 reject(false);
//             });
//         });
//     }
// }