import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthFireService } from '../auth-fire/authFire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isShown = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService,
              private authFireService: AuthFireService,
              private router: Router) { }

  ngOnInit() {
    this.userSub = this.authFireService.authState$.subscribe(user => {
      // inny zapis tego samego
      // this.isAuthenticated = !user ? false : true
      this.isAuthenticated = !!user;
      if (user) {
        console.log('user logged in', user);
        this.router.navigate(['/edytor']);
      } else {
        console.log('user logged out', user);
        this.router.navigate(['/strona-glowna']);
      }
    });

    //
    // this.userSub = this.authService.user.subscribe(user =>
      // inny zapis tego samego
      // this.isAuthenticated = !user ? false : true
    //   this.isAuthenticated = !!user
    // );
  }

  logout() {
    this.authFireService.logout().then(() =>
      console.log('user logout')
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
