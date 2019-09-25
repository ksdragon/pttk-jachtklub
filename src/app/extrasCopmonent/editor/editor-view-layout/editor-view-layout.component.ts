import { Quill } from 'quill';
import { ArticlePage } from './../../../shared/article-page.model';
import { EditorService } from './../editor.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss']
})
export class EditorViewLayoutComponent implements OnInit {

  @Input() articles: ArticlePage [];
  articlesL = [];
  contentViews = [];
  // subscribe: Subscription;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.articles.forEach( (a: ArticlePage) => {
        this.articlesL.push(a.articleLayout);
      });
    console.log('articlesL', this.articlesL);
    this.articlesL.forEach(q => {
      this.contentViews.push(q.content);
    });
    // console.log('ngOninit view-layout', this.contentViews);
    // this.subscribe = this.editorService.articlesChanged.subscribe(
    //   (articles: ArticlePage []) => {
    //     console.log('editor-view-layout', articles);
    //     this.contentView = articles;
    //   }
    // );
  }

}
