import { User as UserFirbase } from 'firebase';
import { ProfileUserService } from './profile-user.service';
import { AuthFireService } from './../../auth-fire/authFire.service';
import { User } from './../../shared/user.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<User>{

  constructor(private profileUserService: ProfileUserService,
              private authFireService: AuthFireService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): User | Observable<User> | Promise<User> {

          const userFire = this.authFireService.user;
          console.log('Resolver ', userFire);
          if (!this.profileUserService.user) {
            this.profileUserService.getProfileUser$(userFire)
            .subscribe(
              (respone: User) => {
                console.log('Resolver User ', respone);
                return respone;
              }
            );
          }
          return this.profileUserService.user;
  }
}
