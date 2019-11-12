import { EditorService } from './../../extrasCopmonent/editor/editor.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { ArticlePage } from 'src/app/shared/article-page.model';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap, map, delay } from 'rxjs/operators';

interface IServerResponse {
  articles: Observable<any[]>;
  total: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  // tslint:disable-next-line: no-input-rename
  articles: ArticlePage[] = [];
  asyncArticles: Observable<any[]>;
  isFetching = false;
  p = 1;
  total: number = 4;
  perPage = 2;

  articleElement = new ArticlePage();

  constructor(private editorService: EditorService,
              private dataStorage: DataStorage,
              private db: AngularFireDatabase) {
              db.list('articles').valueChanges()
              .subscribe( response => {
                this.total = 4; // response.length;
                console.log('response valueChanges', response.length);
              });
            }

getPage(page: number) {
  this.isFetching = true;
  const resonseServer = this.serverCall(page);
  this.asyncArticles = resonseServer.articles;
  this.total = resonseServer.total;
  this.p = page;
  this.isFetching = false;
  }

serverCall(page: number): IServerResponse {
  const perPage = this.perPage;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const articlesList = this.db.list<ArticlePage>('articles',
  ref => ref.orderByKey().startAt(start.toString()).endAt(end.toString())
  ).valueChanges();

  articlesList.subscribe(articles => {
    this.editorService.setArticles(articles);
  });

  // console.log('this.items', this.asyncArticles);
  return{
          articles: articlesList,
          total: this.total
        };
}



  ngOnInit() {
    // this.isFetching = true;
    this.getPage(1);
    // this.getArticlesFromDB();
    // this.isFetching = false;
  }

  private getArticlesFromDB() {
    if (this.articles.length < 1) {
      this.subscription = this.dataStorage.fetchAriticles()
        .subscribe((articles: ArticlePage[]) => {
          this.editorService.setArticles(articles);
          // this.articles = articles;
          console.log(articles);
        });
    }
    this.editorService.articlesChanged.subscribe((articles: ArticlePage[]) => {
      this.articles = articles;
    });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  // testowe przyciski
  onStorageArticles() {
    this.dataStorage.storeArticle();
  }

  // testowe przyciski
  onFetchArticles() {
    this.getPage(1);
    // this.getArticlesFromDB();
  }
}






// articlesLayout = [];
// layoutsViews = [];
// article;



// quill = {
//   ops: [
//     { insert: 'Gandalf', attributes: { bold: true } },
//     { insert: ' the ' },
//     { insert: 'Grey', attributes: { color: '#cccccc' } },
//     {insert: {
//       image: '../../../assets/images/test/01.jpg'
//     },
//     attributes: {
//       // link: 'https://quilljs.com'
//     }}
//   ]
// };


// console.log('OnInit quill',  this.quill);
    // this.subscription = this.editorService.articlesChanged.subscribe(
    //   articles => {
    //     console.log('Articles: ', articles);
    //     this.articles = articles;
    //     //articles.forEach(a => this.articlesLayout.push(a.articleLayout));
    //   }
    // );
          // this.articles = this.editorService.getArticles();
    // this.articles.push(this.articleElement);
    // this.articles.forEach( (a: ArticlePage) => {
    //   this.articlesLayout.push(a.articleLayout);
    // });
    // console.log('OnInit articlesLayout',  this.articlesLayout);
    // this.articlesLayout.forEach(q => {
    //   this.layoutsViews.push(q.content);
    // });
    // this.layoutsViews.push(this.quill);
    // console.log('OnInit layoutsViews',  this.layoutsViews);
