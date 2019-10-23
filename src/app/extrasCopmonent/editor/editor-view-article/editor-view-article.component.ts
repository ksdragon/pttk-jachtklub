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

  constructor(private route: ActivatedRoute,
              private editorService: EditorService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.article = this.editorService.getArticle(id);
    this.contentView = this.article.articlePage;
    console.log(id);
    this.route.params.subscribe((params: Params) => {
      this.article = this.editorService.getArticle(+params.id);
      this.contentView = this.article.articlePage;
      console.log(+params.id);
    });
  }

}
