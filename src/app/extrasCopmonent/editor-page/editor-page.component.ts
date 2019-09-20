import { redo_icon } from 'quill/assets/icons/redo.svg';
import { ImageDrop } from 'quill-image-drop-and-paste';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Quill from 'quill';
import Counter from './counter';

Quill.register('modules/counter', Counter);

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
icons['span-block'] = 'sb';

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
    return ImageFormatAttributesList.reduce(function(formats, attribute) {
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

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit, AfterViewInit {

  modules = {};
  content = '';
  contentView;
  blured = false;
  focused = false;
  editorInstance: any;
  placeholder = 'Utwórz swój artykuł...';
  toolbarOptions = [[ 'emoji' ], ['formula'], ['image'], ['blockquote', 'code-block', 'span-block', 'link'], ['hr']];

  handlerOptions = {
    'span-block': () => {
      const range = this.editorInstance.getSelection();
      const  format = this.editorInstance.getFormat(range);
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
    this.contentView = event.html;
    console.log(this.contentView);
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


  ngOnInit() {
    this.modules = {
      imageResize: {},
      imageDrop: {},
      'emoji-toolbar': true,
      toolbar: {
        container: this.toolbarOptions,
        handlers: this.handlerOptions
      }
    };
  }

  ngAfterViewInit() {
    this.addDivderToEditorToolbar();
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
     this.editorInstance.insertText(range.index, '\n', Quill.sources.USER);
     this.editorInstance.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
     this.editorInstance.setSelection(range.index + 2, Quill.sources.SILENT);
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
 }
