import { ModalViewLayoutComponent } from './modal-view-layout/modal-view-layout.component';
import { EditorService } from './editor.service';
import { ArticlePage } from './../../shared/article-page.model';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', './editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  @ViewChild('appEditorLayout', {static: false}) editorLayout?;
  @ViewChild('appEditorPage', {static: false}) editorPage?;
  editorForm: FormGroup;
  // editorLayout: FormGroup;

  constructor( private editorService: EditorService,
               private modalService: MDBModalService  ) {
  }


  // subscription: Subscription;
  article: ArticlePage;
  modalRef: MDBModalRef;

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

  onClickView(event) {
    event.preventDefault();
    this.editorLayout.onView();
  }

  /* service for modal window
    date: object Delta from Quill editor
  */
  openModal(event) {
    event.preventDefault();
    console.log('this.editorLayout.editor ',  this.editorLayout.editor);
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true,
      data: {
        heading: 'Modal heading',
        content: this.editorLayout.editor.content }
    };
    this.modalRef = this.modalService.show(ModalViewLayoutComponent,
          modalOptions );
    console.log('options',  modalOptions);
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
