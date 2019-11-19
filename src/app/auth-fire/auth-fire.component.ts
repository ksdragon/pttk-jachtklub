import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthFireService, Credentials } from './authFire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-fire',
  templateUrl: './auth-fire.component.html',
  styleUrls: ['./auth-fire.component.scss']
})
export class AuthFireComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authFireService: AuthFireService,
              private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    // reverse value zmiania wartośc true -  false.
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
      // check is not vaild
    if (!form.valid) {return; }

    const credential: Credentials = {
    email: form.value.email,
    password: form.value.password };
    this.isLoading = true;
      // switch login sin  up mode
    if (this.isLoginMode) {
      // logowanie
      this.authFireService.login(credential).then((data) => {
        console.log('logowanie authFire', data);
        this.router.navigate(['/edytor']);
        // return true;
      }).catch((err) => {
        console.log('Error message', err);
      }
      );
    } else {
      // sing up
      const authFire = this.authFireService.register(credential).then((data) => {
        console.log('logowanie authFire', data);
        this.router.navigate(['/edytor']);
        // return true;
      }).catch((err) => {
        console.log('Error message', err);
      }
      );
    }

    // this.authFireService.authState$.subscribe(user => {
    //     this.router.navigate(['/edytor']);
    //     console.log('user', user);
    // });

    // this.authFireService.authState$.subscribe(authState => {
    //   console.log('authState', authState);
    // });

    // console.log('user', this.authFireService.user);

    this.isLoading = false;
    form.reset();
  }

}
