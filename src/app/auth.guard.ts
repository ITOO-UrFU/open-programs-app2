import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        ) { }

    canActivate() {
        const currentUser = this.authService.getCurrentUser();
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