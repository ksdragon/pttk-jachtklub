import { User } from './../../shared/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User as userFirebase } from 'firebase';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ProfileUserService {

  constructor(private db: AngularFireDatabase ){}

  getProfileUserData(userAuth: userFirebase) {
    return this.db.list('users', ref => ref.orderByChild('email').equalTo(userAuth.email))
      .snapshotChanges().subscribe( data => {
        return data;
      });

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
