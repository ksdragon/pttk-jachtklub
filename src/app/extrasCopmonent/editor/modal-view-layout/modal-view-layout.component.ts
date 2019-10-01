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
    // const contentView = { ...this.content, complex: {...this.content.complex}};
    // const contentView = _.clone(this.content);
    // console.log(contentView === this.content);
    // contentView.editor.insertText(contentView.editor.getLength(), 'Modal Test', {
    //   color: '#AD4F18',
    //   size: 'large'
    // }, 'user');
    this.viewContent = this.content.content;
    // console.log('ModalViewLayoutComponent ', this.viewContent);
  }

}
