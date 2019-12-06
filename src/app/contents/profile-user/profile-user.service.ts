import { AuthFireService } from './../../auth-fire/authFire.service';
import { User } from './../../shared/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User as userFirebase } from 'firebase';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ProfileUserService {

  asyncUsers$: Observable<User[]>;
  user: User;
  userAuth: userFirebase;
  categoryUser: string[] = ['user', 'editor', 'manager', 'admin'];

  constructor(private authFireService: AuthFireService,
              private db: AngularFireDatabase) {
              }

  // not used
  getProfileUserData() {
    return this.db.database.ref('users').orderByChild('email').equalTo(this.userAuth.email)
    .once('value', snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }});
  }

  initialConectionDB() {
    this.asyncUsers$ = this.db.list<User>('users').valueChanges();
  }


  getProfileUserById(id: string) {
    const asyncUsers$ = this.db.list<User>('users').valueChanges();
    console.log('getProfileUserById', id);
    return asyncUsers$.pipe(
      map(res => {
        return res.find(x => x.id === id);
      })
      ,
      tap(res => {
        console.log('tap', res);
        return this.user = res;
      })
      );
    }

  getProfileUserObs$() {
    const asyncUsers$ = this.db.list<User>('users').valueChanges();
    console.log('getProfileUser', this.authFireService.user);
    return asyncUsers$.pipe(
      map(res => {
        return res.find(x => x.email === this.authFireService.user.email);
      })
      ,
      tap(res => {
        console.log('tap', res);
        return this.user = res;
        // this.user$.next(res);
      })
      );
    }

  getProfileUserData$() {
    return this.asyncUsers$.pipe(
      map(res => {
        // console.log('getProfileUserData', res.find(x => x.email === userAuth.email));
        return res.find(x => x.email === this.userAuth.email);
      })
      );
    }

  generateId() {
    return this.db.database.ref().push().key;
  }

  storeUserAPI(user: User) {
    if (user.id === undefined) {
      user.id = this.generateId();
    }
    console.log(user);
    this.db.database.ref('users/' + user.id).set(user)
      .then(respone => {
        console.log('zapisano');
      }
      ).catch(err => {
        console.log('storeArticleAPI err', err);
      }
      );
  }

}
