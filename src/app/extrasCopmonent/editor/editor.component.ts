import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { base64StringToBlob } from 'blob-util';

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

import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

// const parchment = Quill.import('parchment');
// const block = parchment.query('block');
// block.tagName = 'DIV';
// // or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
// Quill.register(block /* or NewBlock */, true);

const Parchment = Quill.import('parchment');

let omega = new Parchment.Attributor.Class('omega', 'omega', {
    scope: Parchment.Scope.INLINE
  });
  // omega.boltName = 'omega';
  // omega.tagName = 'div';
Quill.register({'formats/omega': omega});

let Inline = Quill.import('blots/inline');

class SpanBlock extends Inline{

    static create(value){
        let node = super.create();
        node.setAttribute('class','spanblock');
        return node;
    }
}

SpanBlock.blotName = 'spanblock';
SpanBlock.tagName = 'div';
Quill.register(SpanBlock);


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', './editor.component.css']
})
export class EditorComponent implements OnInit {


  quill: Quill;
  public editor;
  content;


  customOptionsModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'], ['emoji'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], ['undo', 'redo'],  ['omega'], ['spanblock'],                                     // remove formatting button

      ['link', 'image', 'video'],
      // link and image, video
    ],
    'emoji-toolbar': true,
    // 'emoji-textarea': true,
    // 'emoji-shortname': true,
    imageResize:
    {
      handleStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    },
    imageDrop: true,
    // {
    //   // handler: this.imageHandler
    // },
    wordcounter: {
      container: '#counter',
      unit: 'znaki'
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: false
    }
    // blotFormatter: {
    //     getActions() {
    //       return [ DeleteAction, ImageSpec];
    //     },
    //     init() {}
    // }
  };


  editorForm: FormGroup;
  editorStyle = {
    minHeight: '300px',
    backgroundColor: '#fff'
  };

  // imageHandler(imageDataUrl, type) {
  //   // console.log(imageDataUrl, type);
  //    // give a default mime type if the type was null
  //   if (!type) { type = 'image/png'; }

  //   // base64 to blob
  //   const blob = base64StringToBlob(imageDataUrl.replace(/^data:image\/\w+;base64,/, ''), type);
  //   // let blob = base64StringToBlob(base64URL.replace(/^data:image\/\w+;base64,/, ''), type);

  //   const filename = ['my', 'cool', 'image', '-', Math.floor(Math.random() * 1e12), '-',
  //     new Date().getTime(), '.', type.match(/^image\/(\w+)$/i)[1]].join('');

  //   // generate a form data
  //   const formData = new FormData();
  //   formData.append('filename', filename);
  //   formData.append('file', blob);
  //   const index = (this.quill.getSelection() || {}).index || this.quill.getLength();
  //   if (index) { this.quill.insertEmbed(index, 'image', '', 'user'); }
  //   // upload image to your server
  //   // callUploadAPI(your_upload_url, formData, (err, res) => {
  //   //   if (err) { return; }
  //   //   // success? you should return the uploaded image's url
  //   //   // then insert into the quill editor
  //   //   const index = (quill.getSelection() || {}).index || quill.getLength()
  //   //   // tslint:disable-next-line: semicolon
  //   //   if (index) { quill.insertEmbed(index, 'image', res.data.image_url, 'user') }
  //   // });
  // }

  omegaHandler() {
    let toolbarOmega = this.quill.getModule('toolbar');
    toolbarOmega.addHandler('omega', () => {
      console.log('omega');
    });


    const customButton = document.querySelector('.ql-omega');
    customButton.addEventListener('click', () => {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertText(range.index, 'Aad');
      }
    });
  }

  spanBlock() {
    const spanBlockButton = document.querySelector('.ql-spanblock');

    spanBlockButton.addEventListener('click', () => {
            console.log('function called');
            const range1 = this.quill.getSelection();
            if(range1){
                console.log('range is valid');
                this.quill.formatText(range1,'spanblock');
            }else{
                console.log('it it invalid');
            }

        }
    );
  }


  onEditorCreated(editor) {
    this.quill = editor;
    this.omegaHandler();
    this.spanBlock();
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
    console.log(this.editor);
  }

  onContentChanged(editor) {
    //  if (e.editor.getLength() > 10) {
    //     e.editor.deleteText(10, e.editor.getLength());
    //   }
    this.editor = editor;
    this.content = editor.json;
    // console.log(editor.content);
  }

}
