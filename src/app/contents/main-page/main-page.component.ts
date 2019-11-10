import { EditorService } from './../../extrasCopmonent/editor/editor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ArticlePage } from 'src/app/shared/article-page.model';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  articles: ArticlePage[] = [];
  items: Observable<any[]>;
  isFetching = false;

  articleElement = new ArticlePage();

  constructor(private editorService: EditorService,
              private dataStorage: DataStorage,
              db: AngularFireDatabase) {
                this.items = db.list('articles').valueChanges();
                console.log('this.items', this.items);
               }


  ngOnInit() {
    this.isFetching = true;

    if (this.articles.length < 1) {
      this.subscription  = this.dataStorage.fetchAriticles()
      .subscribe(
      (articles: ArticlePage[]) => {
        this.editorService.setArticles(articles);
        // this.articles = articles;
        console.log(articles);
      });
    }
    this.editorService.articlesChanged.subscribe((articles: ArticlePage[]) => {
      this.articles = articles;
    });
    this.isFetching = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // testowe przyciski 
  onStorageArticles() {
    this.dataStorage.storeArticle();
  }

  // testowe przyciski 
  onFetchArticles() {
    this.articles = this.dataStorage.articles;    
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
