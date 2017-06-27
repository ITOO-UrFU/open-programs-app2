import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login-page/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService,
        ) { }

    canActivate() {
        const currentUser = this.loginService.getCurrentUser();
        // console.log(currentUser.person.user.is_staff);
        if (currentUser && currentUser.person.user.is_staff) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
        return false;
    }
}