import { ArticlePage } from './article-page.model';
import { EditorService } from './../extrasCopmonent/editor/editor.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class DataStorage {

  articles: ArticlePage[] = [];

  constructor( private http: HttpClient,
               private editorService: EditorService) {}

  storeArticle() {
    const articles = this.editorService.getArticles();
    this.http.put('https://pttk-22f5f.firebaseio.com/articles.json', articles).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  // lepiej użyć return i subskrybować tam gdzie jest potrzebne.
  fetchAriticles() {
    return this.http.get<ArticlePage[]>('https://pttk-22f5f.firebaseio.com/articles.json');
      // .subscribe(
      // (articles: ArticlePage[]) => {
      //   this.editorService.setArticles(articles);
      //   // this.articles = articles;
      //   console.log(articles);
      // });
  }
}
