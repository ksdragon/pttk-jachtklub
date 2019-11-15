import { AngularFireDatabase } from '@angular/fire/database';
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
               private editorService: EditorService,
               private db: AngularFireDatabase) {}

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
  }

  serverCall(page: number, sizePage: number) {
    const perPage = sizePage;
    const start = ((page - 1) * perPage) + 1;
    const articlesList = this.db.list<ArticlePage>('articles'
    , ref => ref.orderByKey().startAt(start.toString()).limitToFirst(perPage)
    ).valueChanges();

    articlesList.subscribe((articles: ArticlePage[])  => {
      articles.forEach((a: ArticlePage) => {
        console.log('a', a);
        if ((this.editorService.getArticles()
            .find(elem => elem.id === a.id)) === undefined) {
          this.editorService.addArticle(a);
          console.log('this.editorService.getArticles()', this.editorService.getArticles());
        }
      });
    });
    return articlesList;
  }


}




// .subscribe(
  // (articles: ArticlePage[]) => {
  //   this.editorService.setArticles(articles);
  //   // this.articles = articles;
  //   console.log(articles);
  // });
