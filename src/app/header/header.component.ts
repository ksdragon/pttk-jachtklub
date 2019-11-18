import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isShown = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user =>
      // inny zapis tego samego
      // this.isAuthenticated = !user ? false : true
      this.isAuthenticated = !!user
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
