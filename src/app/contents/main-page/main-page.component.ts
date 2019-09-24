import { EditorService } from './../../extrasCopmonent/editor-page/editor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlePage } from 'src/app/shared/article-page.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  articles: ArticlePage [] = [];
  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.subscription = this.editorService.articlesChanged.subscribe(
      (articlesPage: ArticlePage []) => {
        this.articles = articlesPage;
      }
    );
    this.articles = this.editorService.getArticles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
