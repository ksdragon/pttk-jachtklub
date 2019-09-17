import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// import * as QuillNamespace from 'quill';
// let Quill: any = QuillNamespace;
import * as Quill from 'quill';

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

import ImageDrop from 'quill-image-drop-and-paste';
Quill.register('modules/imageDrop', ImageDrop);

import Emoij from 'quill-emoji';
Quill.register('modules/emoij', Emoij);

// import Wordcounter from 'quill-wordcounter';
// Quill.register('modules/wordcounter', Wordcounter);

import Wordcounter from './couterWords';
Quill.register('modules/wordcounter', Wordcounter);

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {

  content;
  // emoji: Emoij;

  options = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'], ['emoji'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ],
    'emoji-toolbar': true,
    // 'emoji-textarea': true,
    // 'emoji-shortname': true,
    imageResize: true,
    imageDrop: true,
    wordcounter: {
      container: '#counter',
      unit: 'znaki'
    }
  };


  editorForm: FormGroup;
  editorStyle = {
    height: '300px',
    backgroundColor: '#fff'
  };


  onEditorCreated(quill) {
    // this.emoji = quill.addModule('emoij');
  }

  constructor() {
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
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

}
