import { EditorService } from './../extrasCopmonent/editor/editor.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataStorage {

  constructor( private http: HttpClient,
               private editorService: EditorService) {}

  storeArticle() {
    const articles: any = this.editorService.getArticles();
    const atr = articles[0].articlePage.content;
    this.http.put('https://pttk-22f5f.firebaseio.com/articles.json', atr).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchAriticles() {
    this.http.get('https://pttk-22f5f.firebaseio.com/articles.json').subscribe(
      (articles) => {
        console.log(articles);
      });
  }
}
