import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// export class HasRoleGuard implements CanActivate {


//   constructor(private authService : AuthService, private router: Router){}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       const isAuthorized =  route.data['role'].includes(this.authService.user.role);
//       if (!isAuthorized) {
//       this.router.navigate(['/pages-401']) 
//       }
      
//     return isAuthorized;
//   }
  
// }
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['role'];
    const negateRoles = route.data['negateRoles'] ?? false;

    const userRoles = this.authService.user.role;
    const hasRole = route.data['role'].includes(this.authService.user.role);

    if ((hasRole && !negateRoles) || (!hasRole && negateRoles)) {
      return true;
    } else {
      this.router.navigate(['/pages-401']);
      return false;
    }
  }
}
