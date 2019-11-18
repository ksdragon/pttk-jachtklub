import { AuthService } from './../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ArticlePage } from './article-page.model';
import { EditorService } from './../extrasCopmonent/editor/editor.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class DataStorage {

  articles: ArticlePage[] = [];

  constructor(private http: HttpClient,
              private editorService: EditorService,
              private db: AngularFireDatabase,
              private authService: AuthService) { }

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
    // this.authService.user.pipe(take(1), exhaustMap(user => {
    // }));
    const perPage = sizePage;
    const start = page === 1 ? 0 : ((page - 1) * perPage);
    // const start = page - 1 * perPage;
    const articlesList = this.db.list<ArticlePage>('articles'
      , ref => ref.orderByKey().startAt(start.toString()).limitToFirst(perPage)
    ).valueChanges();
    console.log('articlesList', articlesList);

    articlesList.subscribe((articles: ArticlePage[]) => {
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

  getTotalLenghtArticles() {
    return this.db.list('articles').valueChanges().subscribe(
      response => {
        return response.length;
      });
  }


}




// .subscribe(
  // (articles: ArticlePage[]) => {
  //   this.editorService.setArticles(articles);
  //   // this.articles = articles;
  //   console.log(articles);
  // });
