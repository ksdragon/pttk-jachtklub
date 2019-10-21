import { ArticlePage } from 'src/app/shared/article-page.model';
import { EditorService } from './../extrasCopmonent/editor/editor.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataStorage {

  articles: ArticlePage[] = [];

  constructor( private http: HttpClient,
               private editorService: EditorService) {}

  storeArticle() {
    const articles = this.editorService.getArticles();
    // const atr = articles[0].articlePage.content;
    this.http.put('https://pttk-22f5f.firebaseio.com/articles.json', articles).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchAriticles() {
    this.http.get<ArticlePage[]>('https://pttk-22f5f.firebaseio.com/articles.json').subscribe(
      (articles) => {
        // this.articles = articles;
        console.log(articles);
      });
  }
}
