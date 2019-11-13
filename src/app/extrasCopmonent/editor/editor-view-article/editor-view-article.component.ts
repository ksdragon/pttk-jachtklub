import { ArticlePage } from 'src/app/shared/article-page.model';
import { EditorService } from './../editor.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editor-view-article',
  templateUrl: './editor-view-article.component.html',
  styleUrls: ['./editor-view-article.component.scss']
})
export class EditorViewArticleComponent implements OnInit {

 contentView;
 article: ArticlePage;
 createDate;

  constructor(private route: ActivatedRoute,
              private editorService: EditorService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.article = this.editorService.getArticleById(id);
    console.log('this.article', this.article);
    this.contentView = this.article.articlePage;
    this.createDate = this.article.createDate;
    console.log('this.createDate', this.createDate);
    this.route.params.subscribe((params: Params) => {
      this.article = this.editorService.getArticleById(+params.id);
      this.contentView = this.article.articlePage;
      console.log(+params.id);
    });
  }

}
