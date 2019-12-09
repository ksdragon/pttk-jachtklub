import { take } from 'rxjs/operators';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { ArticlePage } from './../../shared/article-page.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class EditorResolverService implements Resolve<ArticlePage> {

  constructor(private dataStorageService: DataStorage,
              ) {}

  resolve(route: import('@angular/router').ActivatedRouteSnapshot,
          state: import('@angular/router').RouterStateSnapshot):
          ArticlePage | import('rxjs').Observable<ArticlePage> |
          Promise<ArticlePage> {

          if (!this.dataStorageService.article) {
          this.dataStorageService.getArticleById(route.params.id).subscribe(
            (article: ArticlePage) => {
              console.log('Resolver ArticlePage id', route.params.id);
              console.log('Resolver ArticlePage', article);
              return article;
            }
            );
          }
          console.log('Resolver ArticlePage 3', this.dataStorageService.article);
          return this.dataStorageService.article;
  }
  // .pipe(take(1))

}
