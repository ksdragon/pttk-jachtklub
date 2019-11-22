import { ArticlePage } from './../../shared/article-page.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';


export interface IConfigPagination {
  id: string;
  itemsPerPage: number;
  title: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  configPagination: IConfigPagination;
  p;


  constructor() {}

    ngOnInit() {
      this.configPagination = {
        id: 'articles',
        itemsPerPage: 4,
        title: 'Najnowsze Artykuły',
      };
    }


      // subscription: Subscription;

      // tslint:disable-next-line: no-input-rename
      // articles: ArticlePage[] = [];

      // articleElement = new ArticlePage();

      // this.isFetching = true;

      // this.getArticlesFromDB();
      // this.isFetching = false;

      // private getArticlesFromDB() {
        //   if (this.articles.length < 1) {
          //     this.subscription = this.dataStorage.fetchAriticles()
          //       .subscribe((articles: ArticlePage[]) => {
            //         this.editorService.setArticles(articles);
            //         // this.articles = articles;
            //         console.log(articles);
            //       });
  //   }
  //   this.editorService.articlesChanged.subscribe((articles: ArticlePage[]) => {
  //     this.articles = articles;
  //   });
  // }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  // testowe przyciski
  // onStorageArticles() {
  //   this.dataStorage.storeArticle();
  // }

  // testowe przyciski
  // onFetchArticles() {
  //   this.getPage(1);
  //   // this.getArticlesFromDB();
  // }
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
