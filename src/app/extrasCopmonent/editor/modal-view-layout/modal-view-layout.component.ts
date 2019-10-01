import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-view-layout',
  templateUrl: './modal-view-layout.component.html',
  styleUrls: ['./modal-view-layout.component.scss']
})
export class ModalViewLayoutComponent implements OnInit {

  content: any;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    console.log('ModalViewLayoutComponent ', this.content);
  }

}
