import { AuthFireService } from './authFire.service';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authFire: AuthFireService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authFire.authState$.pipe(
      take(1),
      map(user => {
        // konvertuje obiekt w zależności od zawartości jak jest null lub undefine to zwraca false
        // jak zawiera dane zwraca true
        const auth = !!user;
        if (auth) {
          console.log('AuthGuard true');
          return true;
        }
        console.log('AuthGuard false');
        return this.router.createUrlTree(['/auth']);
      }));
  }

}
