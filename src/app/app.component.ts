import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorage } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pttk-jachtklub';
  constructor(private router: Router,
              private dataStorage: DataStorage) {}

  ngOnInit(){
    this.dataStorage.initialConectionDB();
  }

  isHomeRoute() {
    return this.router.url === '/strona-glowna';
  }
}
