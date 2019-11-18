import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pttk-jachtklub';
  constructor(private router: Router) {}


  isHomeRoute() {
    return this.router.url === '/strona-glowna';
  }
}
