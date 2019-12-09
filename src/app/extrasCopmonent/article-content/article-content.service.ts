import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticleContent } from './article-content.component';

@Injectable({providedIn: 'root'})
export class ArticleContentService {

    articleContent: ArticleContent;
    asyncArticlesHeaders$: Observable<ArticleContent[]>;

    constructor(private db: AngularFireDatabase,
                private authService: AuthService) { }


    getArticleByName(name: string) {
    return this.asyncArticlesHeaders$.pipe(
      map(aritcle => {
        return aritcle.find(a => a.name === name
        );
      }
        ),
        tap(article => this.articleContent = article)
    );
  }


            }
