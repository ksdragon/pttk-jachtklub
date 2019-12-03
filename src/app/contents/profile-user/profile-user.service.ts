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
  user$: Subject<User>;
  userAuth: userFirebase;

  constructor(private authFireService: AuthFireService,
              private db: AngularFireDatabase){
              }

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

  getProfileUser$(userAuth) {
    const asyncUsers$ = this.db.list<User>('users').valueChanges();
    console.log('getProfileUser', userAuth);
    return asyncUsers$.pipe(
      map(res => {
        return res.find(x => x.email === userAuth.email);
      })
      ,
      tap(res => {
        console.log('tap', res);
        this.user = res;
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
