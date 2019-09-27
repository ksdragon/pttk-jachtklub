import { EditorService } from './../../extrasCopmonent/editor/editor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlePage } from 'src/app/shared/article-page.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  // subscription: Subscription;

  articles: ArticlePage [] = [];
  articlesLayout = [];
  layoutsViews = [];
  quill = {
    ops: [
      { insert: 'Gandalf', attributes: { bold: true } },
      { insert: ' the ' },
      { insert: 'Grey', attributes: { color: '#cccccc' } },
      {insert: {
        image: '../../../assets/images/test/01.jpg'
      },
      attributes: {
        link: 'https://quilljs.com'
      }}
    ]
  };


  constructor(private editorService: EditorService) { }
  ngOnInit() {
    console.log('OnInit main-page',  this.quill);
    // this.subscription = this.editorService.articlesChanged.subscribe(
    //   (articlesPage) => {
    //     console.log(articlesPage);
    //     this.articles = articlesPage;
    //   }
    // );
    this.articles = this.editorService.getArticles();
    this.articles.forEach( (a: ArticlePage) => {
      this.articlesLayout.push(a.articleLayout);
    });
    this.articlesLayout.forEach(q => {
      this.layoutsViews.push(q.content);
    });
    this.layoutsViews.push(this.quill);
    console.log('OnInit main-page',  this.articlesLayout);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
