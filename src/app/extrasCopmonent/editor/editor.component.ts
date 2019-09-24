import { EditorService } from './editor.service';
import { ArticlePage } from './../../shared/article-page.model';

import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', './editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  @ViewChild('appEditorLayout', {static: false}) editorLayout;
  @ViewChild('appEditorPage', {static: false}) editorPage;
  editorForm: FormGroup;
  // editorLayout: FormGroup;

  constructor( private editorService: EditorService ) {
  }


  // subscription: Subscription;
  article: ArticlePage;

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      // layoutEditor: new FormControl(null)
    });
    // this.editorLayout = new FormGroup({
    //   editor: new FormControl(null),
    //   layoutEditor: new FormControl(null)
    // });
  }

  onSubmit() {
    const article = new ArticlePage();
    article.articleLayout = this.editorLayout.editor;
    article.articlePage = this.editorPage.editor;
    console.log('Editor Component onSubmit');
    console.log(this.editorLayout.editor.content);
    console.log(this.editorPage.editor.content);
    this.editorService.addArticle(article);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
