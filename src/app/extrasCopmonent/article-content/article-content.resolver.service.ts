import { catchError, map, take } from 'rxjs/operators';
import { ArticleContentService } from './article-content.service';
import { ArticleContent } from './article-content.model';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, empty, EMPTY, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleContentResolverService implements Resolve<ArticleContent> {

  article; //: Observable<ArticleContent>;
  isArticle;
  constructor(private articleContentService: ArticleContentService) { }

  resolve(route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot) {

    // this.articleContentService.articleContent$.pipe(take(1)).subscribe(
    //     x => {
    //       this.isArticle = x;
    //       console.log('this.isNull', this.isArticle);
    //     }
    // );

    this.isArticle = this.articleContentService.articleContent$.value;
    // this.article = this.articleContentService.asyncArticlesHeaders$.pipe(
    //   take(1),
    //   map(aritcle => {
    //     return aritcle.find(a => a.name === route.url.toString()
    //     );
    //   }
    // ));
    // console.log('this.article resolver 1', this.article);
    // return this.article;

    // return this.articleContentService.getArticleByName(route.url.toString());
    // .pipe(catchError( e => {
    //   console.log('error', e);
    //   return empty();
    // }));

    if (this.isArticle === null) {
      console.log('this.article resolver 1', this.articleContentService.articleContent$);
      return this.articleContentService.getArticleByName(route.url.toString())
        .pipe(
          take(1),
          map(
            response => {
              return response;
            })
        );
    }
    console.log('this.article resolver 2', this.articleContentService.articleContent$);
    return this.isArticle;

    // this.articleContentService.articleContent$
    //         .pipe(
    //           take(1),
    //           map(
    //           x => {
    //               return x;
    //             })
    //         );


    //  return this.article;

    // .subscribe(
    //   response => {
    //     console.log('Resolver 1', response);
    //     this.article = response;
    //   }
    // );
    // console.log('Resolver 2', this.article);
    // return this.article;
    // }
    // return this.articleContentService.articleContent;
  }
}
