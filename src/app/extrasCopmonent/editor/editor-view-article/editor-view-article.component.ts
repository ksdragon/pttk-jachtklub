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

  constructor(private route: ActivatedRoute,
              private editorService: EditorService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    const article: any = this.editorService.getArticle(id).articlePage;
    this.contentView = article;
    console.log(id);
    this.route.params.subscribe((params: Params) => {
      const content: any = this.editorService.getArticle(+params.id).articlePage;
      this.contentView = content;
      console.log(+params.id);
    });
  }

}
