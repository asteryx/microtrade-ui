import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './app.models'




function isLoggedIn(user: User): boolean{  
  if (user.isLoggedIn()) {
    // logged in so return true
    return true
  }else{
    return false;
  }
  
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private user: User, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      if (isLoggedIn(this.user)){
        return true;
      }
      this.user.logout();
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }

  resolve(): void {
    if (isLoggedIn(this.user)){
      this.router.navigate(['/dashboard'])
    }
   
  }

}

