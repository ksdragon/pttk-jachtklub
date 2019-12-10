import { ArticleContentService } from './extrasCopmonent/article-content/article-content.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorage } from './shared/data-storage.service';
import { ProfileUserService } from './contents/profile-user/profile-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pttk-jachtklub';
  constructor(private router: Router,
              private dataStorage: DataStorage,
              private profileUserService: ProfileUserService,
              private articleContentService: ArticleContentService) {}

  ngOnInit(){
    this.dataStorage.initialConectionDB();
    this.profileUserService.initialConectionDB();
    this.articleContentService.initialConectionDB();
  }

  isHomeRoute() {
    return this.router.url === '/strona-glowna';
  }
}
