import { ArticlePage } from './../../../shared/article-page.model';
import { DataStorage } from 'src/app/shared/data-storage.service';
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
              private editorService: EditorService,
              private dataStorage: DataStorage) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    console.log('id', id);
    this.dataStorage.asyncArticles.subscribe(
      (data: ArticlePage[]) => {
        this.article = data.find(a => a.id === id);
        this.contentView = this.article.articlePage;
        this.createDate = this.article.createDate;
        console.log('this.article', data.find(a => a.id === id));
        console.log('this.article',  this.article);
      }
    );
    // console.log('this.createDate', this.createDate);
    // this.route.params.subscribe((params: Params) => {
    //   this.article = this.editorService.getArticleById(+params.id);
    //   this.contentView = this.article.articlePage;
    //   console.log(+params.id);
    // });
  }

}
