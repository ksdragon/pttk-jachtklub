import { DataStorage } from 'src/app/shared/data-storage.service';
import { ModalViewLayoutComponent } from './modal-view-layout/modal-view-layout.component';
import { EditorService } from './editor.service';
import { ArticlePage } from './../../shared/article-page.model';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import Quill from 'quill';
import * as cloneDeep from 'lodash/cloneDeep';
import { findSafariExecutable } from 'selenium-webdriver/safari';

const Parchment = Quill.import('parchment');
const PttkEditor = new Parchment.Attributor.Class('pttk-editor', 'pttk-editor');
Quill.register(PttkEditor);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', './editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  // zwraca cały comonent EditorLayoutComponent z wszystkimi polami
  // i metodami
  @ViewChild('appEditorLayout', { static: false }) editorLayout?;
  @ViewChild('appEditorPage', { static: false }) editorPage?;
  editorLayoutModal;
  editorPageModal;
  editorForm: FormGroup;
  contentView;
  titleHeader;
  id = 1;
  isModal = false;
  // editorLayout: FormGroup;

  constructor(private editorService: EditorService,
              private modalService: MDBModalService,
              private dataStorage: DataStorage) {}


    // subscription: Subscription;
    article: ArticlePage;
    modalRef: MDBModalRef; // service modal window

  ngAfterViewInit(): void {
      console.log('init id', this.id);
    }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
    });
    const articles = this.editorService.getArticles();
    if (articles.length > 0) {
      const art = articles[articles.length - 1];
      // this.id = art.id + 1;
    }
    // this.dataStorage.getTotalLenghtArticles().subscribe(
    //   len => this.id = len
    // );
    // this.id = this.dataStorage.getNewKeyFromDB();


    // const node = document.createElement('div');
    // node.append('Czytaj');
    // PttkEditor.add(node, 'layout');
    // console.log(node.outerHTML);
  }

  onClickView(event) {
    event.preventDefault();
    console.log('editorLayout', this.editorLayout);
    this.editorLayout.onView();
  }

  /* service for modal window
    date: object Delta from Quill editor
  */
  openModalLayout(event) {
    event.preventDefault();
    this.isModal = true;
    this.changeQuillEditor(this.isModal);
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
        content: this.editorLayout.editor
      }
    };
    this.modalRef = this.modalService.show(ModalViewLayoutComponent,
      modalOptions);
    // this.editorLayout.editor.editor.setContents(cloneEditorInstance);
  }

  private changeQuillEditor(isModal: boolean) {
    const instanceEditorLayout: Quill = this.editorLayout.editorInstance;
    const instanceEditorPage: Quill = this.editorPage.editorInstance;
    let range = instanceEditorLayout.getLength();
    const firstParagraph = instanceEditorPage.getText(0, 168);
    const firstParagraphLayout = instanceEditorLayout.getText(0, 168);
    // console.log('firstParagraphLayout', firstParagraphLayout);
    this.titleHeader = firstParagraphLayout;
    console.log('firstParagraph', firstParagraph);
    const format = instanceEditorLayout.getFormat(range - 5);
    if (!format['pttk-editor']) {
      if (!isModal) {
        instanceEditorLayout.insertText(range, firstParagraph + '...', 'user');
        range = instanceEditorLayout.getLength();
        instanceEditorLayout.insertText(range, 'Czytaj dalej...', {
        size: 'large',
        routerLink:  '/article/' + this.id
      }, 'user');
        instanceEditorLayout.formatLine(range, range, 'pttk-editor', 'layout');
        instanceEditorLayout.insertEmbed(range, 'divider', true, 'user');
        instanceEditorLayout.formatLine(range, range, 'align', 'right');
    }
    }
  }

  // private changeQuillEditor1(isModal: boolean) {
  //   let instanceEditorLayout;
  //   let instanceEditorPage;
  //   if (isModal) {
  //     this.editorLayoutModal = cloneDeep(this.editorLayout);
  //     this.editorPageModal = cloneDeep(this.editorPage);
  //     instanceEditorPage = this.editorPageModal.editor.editor;
  //     instanceEditorLayout = this.editorLayoutModal.editor.editor;
  //   } else {
  //     instanceEditorLayout = this.editorLayout.editor.editor;
  //     instanceEditorPage = this.editorPage.editor.editor;
  //   }
  //   let range = instanceEditorLayout.getLength();
  //   const firstParagraph = instanceEditorPage.getText(0, 168);
  //   console.log('firstParagraph', firstParagraph);
  //   const format = instanceEditorLayout.getFormat(range - 5);
  //   if (!format['pttk-editor']) {
  //     instanceEditorLayout.insertText(range, firstParagraph + '...', 'user');
  //     range = instanceEditorLayout.getLength();
  //     instanceEditorLayout.insertText(range, 'Czytaj dalej...', {
  //       size: 'large',
  //       link: '/article/' + this.id
  //     }, 'user');
  //     instanceEditorLayout.formatLine(range, range, 'pttk-editor', 'layout');
  //     instanceEditorLayout.insertEmbed(range, 'divider', true, 'user');
  //     instanceEditorLayout.formatLine(range, range, 'align', 'right');
  //   }
  // }

  onSubmit() {
    this.isModal = false;
    this.changeQuillEditor(this.isModal);
    const article = new ArticlePage();
    // console.log('this.editorLayout.editor.content', this.editorLayout.editor.content);
    article.articleLayout = this.editorLayout.editor.content;
    article.articlePage = this.editorPage.editor.content;
    // article.id = this.id;
    article.header = this.titleHeader;
    article.createDate = new Date();
    console.log(article.createDate);
    // console.log(this.editorLayout.editor.content);
    // console.log(this.editorPage.editor.content);
    this.editorService.addArticle(article);
    this.id++;
    // this.dataStorage.storeArticle();
    this.dataStorage.storeArticleAPI(article);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  //  deep<T>(value: T): T {
  //     if (typeof value !== 'object' || value === null) {
  //       return value;
  //     }
  //     if (Array.isArray(value)) {
  //       return this.deepArray(value);
  //     }
  //     return this.deepObject(value);
  //    }

  //  deepObject<T>(source: T) {
  //     const result = {};
  //     Object.keys(source).forEach((key) => {
  //       const value = source[key];
  //       result[key] = this.deep(value);
  //     }, {});
  //     return result as T;
  //    }

  //    deepArray<T extends any[]>(collection: T) {
  //     return collection.map((value) => {
  //       return this.deep(value);
  //     });
  //    }
}
