import { DataStorage } from 'src/app/shared/data-storage.service';
import { ModalViewLayoutComponent } from './modal-view-layout/modal-view-layout.component';
import { EditorService } from './editor.service';
import { ArticlePage } from './../../shared/article-page.model';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import Quill from 'quill';
import _ from 'underscore';

const Parchment = Quill.import('parchment');
const PttkEditor = new Parchment.Attributor.Class('pttk-editor', 'pttk-editor');
Quill.register(PttkEditor);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', './editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  @ViewChild('appEditorLayout', {static: false}) editorLayout?;
  @ViewChild('appEditorPage', {static: false}) editorPage?;
  editorForm: FormGroup;
  contentView;
  id = 0;
  // editorLayout: FormGroup;

  constructor( private editorService: EditorService,
               private modalService: MDBModalService,
               private dataStorage: DataStorage  ) {
  }


  // subscription: Subscription;
  article: ArticlePage;
  modalRef: MDBModalRef; // service modal window

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
    });
    const articles = this.editorService.getArticles();
    if (articles.length > 0) {
      const art = articles[articles.length - 1];
      this.id = art.id + 1;
      // console.log('id', art.id);
    }

    // const node = document.createElement('div');
    // node.append('Czytaj');
    // PttkEditor.add(node, 'layout');
    // console.log(node.outerHTML);
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
    this.changeQuillEditor();
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered modal-lg',
      containerClass: '',
      animated: true,
      data: {
        heading: 'Modal heading',
        content: this.editorLayout.editor }
    };
    this.modalRef = this.modalService.show(ModalViewLayoutComponent,
          modalOptions );
    // this.editorLayout.editor.editor.setContents(cloneEditorInstance);
  }

  private changeQuillEditor() {
    let range = this.editorLayout.editor.editor.getLength();
    const instanceEditorLayout = this.editorLayout.editor.editor;
    const instanceEditorPage: Quill = this.editorPage.editor.editor;
    const firstParagraph = instanceEditorPage.getText(0, 168);
    console.log('firstParagraph', firstParagraph);
    const format = instanceEditorLayout.getFormat(range - 5);
    if (!format['pttk-editor']) {
      instanceEditorLayout.insertText(range, firstParagraph + '...', 'user');
      range = this.editorLayout.editor.editor.getLength();
      instanceEditorLayout.insertText(range, 'Czytaj dalej...', {
        size: 'large',
        link: '#'
      }, 'user');
      instanceEditorLayout.formatLine(range, range, 'pttk-editor', 'layout');
      instanceEditorLayout.insertEmbed(range, 'divider', true, 'user');
      instanceEditorLayout.formatLine(range, range, 'align', 'right');
    }
  }

  onSubmit() {
    this.changeQuillEditor();
    const article = new ArticlePage();
    article.articleLayout = this.editorLayout.editor.content;
    article.articlePage = this.editorPage.editor.content;
    article.id = this.id;
    console.log('Editor Component onSubmit');
    console.log(this.editorLayout.editor.content);
    console.log(this.editorPage.editor.content);
    this.editorService.addArticle(article);
    this.id++;
    this.dataStorage.storeArticle();
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
