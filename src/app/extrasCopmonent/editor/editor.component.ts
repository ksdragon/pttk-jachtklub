import { ModalViewLayoutComponent } from './modal-view-layout/modal-view-layout.component';
import { EditorService } from './editor.service';
import { ArticlePage } from './../../shared/article-page.model';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import Quill from 'quill';
const _ = require('underscore');

const Parchment = Quill.import('parchment');
let Align = new Parchment.Attributor.Class('endtitle', 'end-title');
Quill.register(Align);

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
    let node = document.createElement('div');
    node.append('Czytaj');
    Align.add(node, 'layout');
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
    let instanceEditor = this.editorLayout.editor.editor;
    console.log('instanceEditor', instanceEditor);
    const cloneEditorInstance = _.clone(instanceEditor);
    const rangeSelected = instanceEditor.getSelection(true);
    instanceEditor.insertText(range, 'Czytaj dalej...', {
      color: '#AD4F18',
      size: 'large'
    }, 'user');
    instanceEditor.insertEmbed(range, 'divider', true, 'user');
    instanceEditor.formatLine(range, range, 'align', 'right'); 
    
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
    console.log('options',  modalOptions);
    // this.editorLayout.editor.editor.setContents(cloneEditorInstance);
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
