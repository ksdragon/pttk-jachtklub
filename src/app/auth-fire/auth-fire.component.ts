import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthFireService, Credentials } from './authFire.service';

@Component({
  selector: 'app-auth-fire',
  templateUrl: './auth-fire.component.html',
  styleUrls: ['./auth-fire.component.scss']
})
export class AuthFireComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authFireService: AuthFireService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    // reverse value zmiania wartośc true -  false.
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) {return;}

    const credential: Credentials = {
    email: form.value.email,
    password: form.value.password
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      // logowanie
      const authFire = this.authFireService.login(credential);
      console.log('authFire', authFire);
    } else {
      // sing up
      const authFire = this.authFireService.register(credential);
      console.log('authFire', authFire);
    }
    
    this.authFireService.authState$.subscribe(authState => {
      console.log('authState', authState);      
    });
    	
    console.log('user', this.authFireService.user);
    
    this.isLoading = false;
    form.reset();
  }

}
