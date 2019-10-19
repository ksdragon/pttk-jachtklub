import { ArticlePage } from './../../../shared/article-page.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import Quill from 'quill';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorViewLayoutComponent implements OnInit {

  @Input() contentView;
  @Input() article: ArticlePage;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('editorViewLayout', this.contentView);
  }

  onclick() {
    // const articlePage: any = this.article.articlePage;
    this.router.navigate(['/article', this.article.id]);
    // console.log('id', this.article.id);
    // console.log('id', articlePage.editor);

  }
}
