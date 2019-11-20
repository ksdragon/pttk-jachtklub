import { ArticlePage } from './../../../shared/article-page.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorViewLayoutComponent implements OnInit {

  contentView;
  @Input() id;
  @Input() article: ArticlePage;


  constructor(private router: Router) { }

  ngOnInit() {
    this.contentView = this.article.articleLayout;
    // console.log('editorViewLayout id', this.id);
    // console.log('editorViewLayout id', this.contentView);
  }

  onclick() {
    this.router.navigate(['/article', this.article.id]);
  }
}
