import { ArticleContent } from './article-content.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap, take } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ArticleContentService {

    articleContent$ = new BehaviorSubject<ArticleContent>(null);
    asyncArticlesHeaders$: Observable<ArticleContent[]>;

    constructor(private db: AngularFireDatabase) { }


  getArticleByName(name: string) {
    return this.asyncArticlesHeaders$.pipe(
      map(aritcle => {
        return aritcle.find(a => a.name === name
        );
      }
        ),
        tap(article => this.articleContent$.next(article))
    );
  }

  initialConectionDB() {
    this.asyncArticlesHeaders$ = this.db.list<ArticleContent>('articlesContents').valueChanges();
  }

  storeArticleContent(article: ArticleContent) {
    // add new entry to db
    this.articleContent$.next(article);
    this.db.database.ref('articlesContents/' + article.name).set(article)
    .then(respone => {
      console.log('storeArticleAPI', respone);
    }
    ).catch(err => {
      console.log('storeArticleAPI', err);
    }
    );
  }

  }
