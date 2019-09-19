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

  constructor() {
    this.modules = {
      imageResize: {},
      imageDrop: {},
      'emoji-toolbar': true,
      toolbar: { container: [[ 'emoji' ], ['formula'], ['image'], ['code-block'], ['hr']]  }
    };
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
    this.contentView = event.json;
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
  }

  ngAfterViewInit() {
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
}
