import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private profileService: ProfileService,
        ) { }


canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        const allowedRoles = route.data['roles'] as Array<string>;
        const currentUser = this.authService.getCurrentUser();
        if (currentUser){
            const userRoles = [];
            for (let role of currentUser.person.user.groups) {
                userRoles.push(role.name);
            }
            const intersectRoles = allowedRoles.filter(function(n) { return userRoles.indexOf(n) !== -1; });
            // console.log("Роли текущего пользователя", userRoles);
            if(allowedRoles == null || intersectRoles.length !== 0 ){
                return true;
            }
            else{
                alert('Вам туда нельзя!');
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}