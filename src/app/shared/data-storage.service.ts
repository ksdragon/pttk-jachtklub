import { AuthService } from './../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ArticlePage } from './article-page.model';
import { EditorService } from './../extrasCopmonent/editor/editor.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorage {

  articles: ArticlePage[] = [];
  asyncArticles: Observable<ArticlePage[]>;

  constructor(private http: HttpClient,
              private editorService: EditorService,
              private db: AngularFireDatabase,
              private authService: AuthService) { }



  storeArticleAPI(article: ArticlePage) {
    this.db.database.ref('articles').push(article)
    .then(respone => {
      console.log('storeArticleAPI', respone);
    }
    ).catch(err => {
      console.log('storeArticleAPI', err);
    }
    );
  }



  serverCall(page: number, sizePage: number) {
    const perPage = sizePage;
    const start = page === 1 ? 0 : ((page - 1) * perPage);
    // const start = page - 1 * perPage;
    const articlesList = this.db.list<ArticlePage>('articles'
      , ref => ref.orderByKey().startAt(start.toString()).limitToFirst(perPage)
    ).valueChanges();
    console.log('articlesList', articlesList);

    // articlesList.subscribe((articles: ArticlePage[]) => {
    //   articles.forEach((a: ArticlePage) => {
    //     console.log('a', a);
    //     if ((this.editorService.getArticles()
    //       .find(elem => elem.id === a.id)) === undefined) {
    //       this.editorService.addArticle(a);
    //       console.log('this.editorService.getArticles()', this.editorService.getArticles());
    //     }
    //   });
    // });
    this.asyncArticles = articlesList;
    return articlesList;
  }

  getTotalLenghtArticles() {
   return this.db.list('articles').valueChanges().pipe(
      map(response => {
        return response.length;
      })
    );
  }

  // lepiej użyć return i subskrybować tam gdzie jest potrzebne.
  // dodane parametry działaja ale zwracją obiekt a nie tablice obiektów.
  // zapytania za wolno działają w porównianiu z API firebase która wykorzytuje tunel do pobierania danych.
  fetchAriticlesPagination() {
    const params = new HttpParams()
    .set('orderBy', '"$key"')
    .set('startAt', '"3"')
    .set('limitToFirst', '2');
    return this.http.get<ArticlePage[]>('https://pttk-22f5f.firebaseio.com/articles.json', { params });
  }

  fetchAriticles() {
    return this.http.get<ArticlePage[]>('https://pttk-22f5f.firebaseio.com/articles.json');
  }

  storeArticle() {
    const articles = this.editorService.getArticles();
    this.http.put('https://pttk-22f5f.firebaseio.com/articles.json', articles).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}




// .subscribe(
  // (articles: ArticlePage[]) => {
  //   this.editorService.setArticles(articles);
  //   // this.articles = articles;
  //   console.log(articles);
  // });
