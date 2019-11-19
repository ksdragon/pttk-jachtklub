import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

export interface Credentials {
    email: string;
    password: string;
  }

@Injectable({providedIn: 'root'})
export class AuthFireService {
    readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.auth.languageCode = 'pl';
  }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({email, password}: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => this.handleErrors(error));
  }

  register({email, password}: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  // Handle Errors here.
  private handleErrors(error) {
    let errorMessage = 'An unknown error occurred';
    const errorCode = error.code;

    errorMessage = error.message;

    if (errorCode === 'auth/weak-password') {
      return ('The password is too weak.');
    } else {
      return (errorMessage);
    }
    // console.log(error);
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred';
  //     // sprawdzenie czy nie ma innych błędów (np sieciowych)
  //     // sprawdzenie czy istnieje taki obiek z taką włąściwością.
  //   if (!errorRes.error || !errorRes.error.error) {
  //       return throwError(errorMessage);
  //     }
  //   switch (errorRes.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //       errorMessage = 'This email already exists';
  //     }
  //   return throwError(errorMessage);

  // }


}
