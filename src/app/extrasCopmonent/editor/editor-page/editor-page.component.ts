import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
// import Quill from 'quill';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;

import Counter from './counter';

// import * as Quill from 'quill';

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

import ImageDrop from 'quill-image-drop-and-paste';
Quill.register('modules/imageDrop', ImageDrop);

import Emoij from 'quill-emoji';
Quill.register('modules/emoij', Emoij);

Quill.register('modules/counter', Counter);

import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompressor', ImageCompress);

// class Compressor extends ImageCompress {
//   quill: any;
//   range: any;
//   options: any;
//   constructor(quill, options) {
//     super(quill, options);
//     this.quill = quill;
//     // console.log(quill);
//     this.options = options;
//     this.range = null;
//     // super.debug = options.debug === null || options.debug === true;

//     // // super.warnAboutOptions(options);

//     const toolbar = this.quill.getModule('toolbar');
//     toolbar.addHandler('routerLinkImage', super.selectLocalImage.bind(this));
//   }

//   insertToEditor(url) {
//     const range = this.range;
//     super.logFileSize(url);
//     // console.log('url', `${url}`);
//     // Insert the compressed image
//     console.log('this.options', this.options.routerLink);
//     this.quill.insertEmbed(range.index, 'routerLinkImage',
//     {
//       src: `${url}`,
//       routerLink:  this.options.routerLink,
//       style: this.options.style
//     },
//     'user'
//     );
//     // Move cursor to next position
//     range.index++;
//     this.quill.setSelection(range, 'api');
//   }

// }
// Quill.register('modules/imageCompress', Compressor);

const font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
font.whitelist = ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace'];
Quill.register(font, true);

const BlockEmbed = Quill.import('blots/block/embed');
class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';
Quill.register(DividerBlot);

// class SpanBlockClass extends BlockEmbed {}
// SpanBlockClass.blotName = 'span-block';
// SpanBlockClass.tagName = 'span';

const Parchment = Quill.import('parchment');
const config = { scope: Parchment.Scope.BLOCK };
const SpanBlockClass = new Parchment.Attributor.Class('span-block', 'span', config);
Quill.register(SpanBlockClass, true);

const icons = Quill.import('ui/icons');
icons['span-block'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
// tslint:disable-next-line: no-string-literal
icons['spanblock'] = '<i class="far fa-square"></i>';

// solution for keep style in img
const BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
];

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);

// end

import '../../../shared/quill-blots/router-link.blots.js';
import '../../../shared/quill-blots/router-link-image.blots.js';
import '../../../shared/quill-blots/image-router-link.blots.js';
import '../../../shared/quill-modules/image-compressor.module.js';
import '../../../shared/quill-modules/custom-image-compressor.module.ts';

// Quill.register('modules/customImageCompress', CustomImageCompressor);


const Inline = Quill.import('blots/inline');
class SpanBlock extends Inline {

  static create(value) {
    const node = super.create();
    node.setAttribute('class', 'spanblock');
    return node;
  }
}

SpanBlock.blotName = 'spanblock';
SpanBlock.tagName = 'div';
Quill.register(SpanBlock);



@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit, AfterViewInit {

  editor;
  modules = {};
  editorForm: FormGroup;
  contentView;
  blured = false;
  focused = false;
  editorInstance: any;
  placeholder = 'Utwórz swój artykuł...';

  toolbarOptions =
    [
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

      ['clean'], ['hr'], ['spanblock'],                                   // remove formatting button

      ['link', 'image', 'video', 'span-block'],
      // link and image, video
    ];

  handlerOptions = {
    'span-block': () => {
      // Save current cursor state
      const range = this.editorInstance.getSelection();
      const format = this.editorInstance.getFormat(range);
      console.log(range);
      if (!format['span-block']) {
        this.editorInstance.format('span-block', 'block');
      } else {
        this.editorInstance.removeFormat(range.index, range.index + range.length);
      }
    }
  };


  editorStyle = {
    minHeight: '300px',
    backgroundColor: '#fff'
  };

  constructor() {
  }

  created(event) {
    // tslint:disable-next-line:no-console
    this.editorInstance = event;
    console.log('editor-created', event);
  }

  changedEditor(event) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event);
  }

  ContentChanged(event) {
    this.contentView = event.content;
    console.log(this.contentView);
    this.editor = event;
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value);
    console.log('Oject editor from after content chanded: ');
    console.log(this.editor);
  }


  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      layoutEditor: new FormControl(null)
    });
    this.modules = {
      imageResize: {},
      imageDrop: true,
      'emoji-toolbar': true,
      imageCompressor: {
        // customImageCompressor: {
          quality: 0.9, // default
          maxWidth: 1000, // default
          imageType: 'image/jpeg', // default
          debug: true, // default
      },
      toolbar: {
        container: this.toolbarOptions,
        handlers: this.handlerOptions
      }
    };
  }

  ngAfterViewInit() {
    this.addDivderToEditorToolbar();
    this.snapblock();
    // this.addSpanBlockToToolbar();
  }

  addDivderToEditorToolbar() {
    const dividerToolbarButton = document.querySelector('.ql-hr');
    dividerToolbarButton.textContent = '<Hr>';
    dividerToolbarButton.classList.add('mdi');
    dividerToolbarButton.classList.add('mdi-minus');
    dividerToolbarButton.classList.add('mdi-18px');
    dividerToolbarButton.addEventListener('click', (e) => {
      e.preventDefault();

      const range = this.editorInstance.getSelection(true);

      // The editor_instance was created during onEditorCreated event.
      // this.editorInstance.insertText(range.index, '\n', Quill.sources.USER);
      // this.editorInstance.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
      // this.editorInstance.setSelection(range.index + 2, Quill.sources.SILENT);
      this.editorInstance.insertText(range.index, '\n', 'user');
      this.editorInstance.insertEmbed(range.index + 1, 'divider', true, 'user');
      this.editorInstance.setSelection(range.index + 2, 'silent');
    });
  }
  addSpanBlockToToolbar() {
    const spanBlockToolBarButton = document.querySelector('.ql-span-block');

    spanBlockToolBarButton.addEventListener('click', (e) => {
      e.preventDefault();
      const range = this.editorInstance.getSelection(true);
      const format = this.editorInstance.getFormat(range);
      console.log(range);
      console.log(format);
      if (!format['span-block']) {
        // this.editorInstance.formatText(range, '.span-block');
        this.editorInstance.format('span-block', 'block');
      } else {
        this.editorInstance.removeFormat(range.index, range.index + range.length);
      }
    }
    );
  }

  snapblock() {
    const spanBlockButton = document.querySelector('.ql-spanblock');

    spanBlockButton.addEventListener('click', () => {
      console.log('function called');
      const range = this.editorInstance.getSelection();
      if (range) {
        console.log('range is valid');
        this.editorInstance.formatText(range, 'spanblock');
      } else {
        console.log('it it invalid');
      }

    }
    );
  }
}
