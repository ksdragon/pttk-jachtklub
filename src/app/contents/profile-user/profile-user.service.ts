import { User } from './../../shared/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User as userFirebase } from 'firebase';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ProfileUserService {

  asyncUsers$: Observable<User[]>;

  constructor(private db: AngularFireDatabase ){}

  getProfileUserData(userAuth: userFirebase) {
    return this.db.database.ref('users').orderByChild('email').equalTo(userAuth.email)
    .once('value', snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }});
  }

  initialConectionDB() {
    this.asyncUsers$ = this.db.list<User>('users').valueChanges();
  }

  getProfileUserData$(userAuth: userFirebase) {
    return this.asyncUsers$.pipe(
      map(res => {
        return res.find(x => x.email === userAuth.email);
      }));
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
