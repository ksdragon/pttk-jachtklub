import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as Quill from 'quill';

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);
import ImageDrop from 'quill-image-drop-and-paste';
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {

  content;

  editorForm: FormGroup;
  editorStyle = {
    height: '300px',
    backgroundColor: '#fff'
  };


  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup ({
      editor: new FormControl(null)
    });
  }


  onSubmit() {
    console.log(this.editorForm.get('editor').value);
  }

  maxLenght(e) {
  //  if (e.editor.getLength() > 10) {
  //     e.editor.deleteText(10, e.editor.getLength());
  //   }
   this.content = e.content;
   console.log(this.content);
  }

options = {
    // toolbar: [
    //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //   ['blockquote', 'code-block'],

    //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //   [{ 'direction': 'rtl' }],                         // text direction

    //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //   [{ 'font': [] }],
    //   [{ 'align': [] }],

    //   ['clean'],                                         // remove formatting button

    //   ['link', 'image', 'video']                         // link and image, video
    // ],
    imageResize: true,
    imageDrop: true
  };


}
