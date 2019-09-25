import { ArticlePage } from 'src/app/shared/article-page.model';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  articlesChanged = new Subject<ArticlePage[]>();
  private articles: ArticlePage[] = [];


  // articleAboutUs: ArticlePage = {id: 1, category: ['Nawigacja']};

  constructor() { }

  setArticles(articles: ArticlePage[]) {
    this.articles = articles;
    this.articlesChanged.next(this.articles.slice());
  }


  getArticles() {
    return this.articles.slice();
  }

  getArticle(index: number) {
    return this.articles.slice()[index];
  }

  addArticle(article: ArticlePage) {
    this.articles.push(article);
    this.articlesChanged.next(this.articles.slice());
    console.log('editorService - this.aticles' , this.articles);
    console.log('editorService - this.articlesChanged' , this.articlesChanged);
  }

  updateArticle(index: number, newArticle: ArticlePage) {
    this.articles[index] = newArticle;
    this.articlesChanged.next(this.articles.slice());
  }

  deleteArticle(index: number) {
    this.articles.splice(index, 1);
    this.articlesChanged.next(this.articles.slice());
  }
}
