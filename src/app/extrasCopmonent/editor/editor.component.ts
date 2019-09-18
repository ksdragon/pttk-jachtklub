import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QUILL_CONFIG_TOKEN, QuillConfig } from 'ngx-quill';


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

import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true);


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...'
  };


content;
  // emoji: Emoij;

customOptionsModule = {
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
    imageResize: {
      parchment: Quill.import('parchment')
    },
    imageDrop: true,
    wordcounter: {
      container: '#counter',
      unit: 'znaki'
    }
  };


editorForm: FormGroup;
editorStyle = {
    minHeight: '300px',
    backgroundColor: '#fff'
  };



onEditorCreated(editor) {
    // editor.getSelection(true);
    // this.emoji = quill.addModule('emoij');
  }

onSelectionChanged(editor) {
    console.log(editor);
  }

onEditorChanged(editor) {
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

onContentChanged(editor) {
    //  if (e.editor.getLength() > 10) {
    //     e.editor.deleteText(10, e.editor.getLength());
    //   }
    this.content = editor.content;
    console.log(editor.content);
  }

}
