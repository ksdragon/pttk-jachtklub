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
               private modalService: MDBModalService  ) {
  }


  // subscription: Subscription;
  article: ArticlePage;
  modalRef: MDBModalRef; // service modal window

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      // layoutEditor: new FormControl(null)
    });
    // this.editorLayout = new FormGroup({
    //   editor: new FormControl(null),
    //   layoutEditor: new FormControl(null)
    // });
    const node = document.createElement('div');
    node.append('Czytaj');
    PttkEditor.add(node, 'layout');
    console.log(node.outerHTML);
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
    const range = this.editorLayout.editor.editor.getLength();
    const instanceEditor = this.editorLayout.editor.editor;
    const format = instanceEditor.getFormat(range - 5);
    // console.log('instanceEditor in editorComponent',  instanceEditor);
    // console.log('this.editorLayout', this.editorLayout);
    // const cloneEditorInstance = _.clone(instanceEditor);
    // const rangeSelected = instanceEditor.getSelection();
    // console.log('range',  range);
    // console.log('rangeSelected',  rangeSelected);
    // console.log('format',  format);
    if (!format['pttk-editor']) {
      instanceEditor.insertText(range, 'Czytaj dalej...', {
        size: 'large',
        link: '#'
      }, 'user');
      instanceEditor.formatLine(range, range, 'pttk-editor', 'layout');
      instanceEditor.insertEmbed(range, 'divider', true, 'user');
      instanceEditor.formatLine(range, range, 'align', 'right');
    }
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

  onSubmit() {
    const article = new ArticlePage();
    article.articleLayout = this.editorLayout.editor;
    article.articlePage = this.editorPage.editor;
    article.id = this.id;
    console.log('Editor Component onSubmit');
    console.log(this.editorLayout.editor.content);
    console.log(this.editorPage.editor.content);
    this.editorService.addArticle(article);
    this.id++;
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
