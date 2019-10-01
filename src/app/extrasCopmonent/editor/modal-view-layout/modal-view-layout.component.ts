import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-view-layout',
  templateUrl: './modal-view-layout.component.html',
  styleUrls: ['./modal-view-layout.component.scss']
})
export class ModalViewLayoutComponent implements OnInit {

  content: any;
  viewContent;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    const contentView = { ...this.content, complex: {...this.content.complex}};
    this.content.editor.insertText(this.content.editor.getLength(), 'Modal Test', {
      color: '#AD4F18',
      size: 'large'
    }, 'user');
    // this.content = contentView;
    this.viewContent = Object.create(this.content.content);
    this.content = contentView;
    console.log('ModalViewLayoutComponent ', this.viewContent);
  }

}
