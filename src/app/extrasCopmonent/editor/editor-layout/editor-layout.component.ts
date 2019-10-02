import { FormControl, FormGroup, ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import Quill from 'quill';

const Inline = Quill.import('blots/inline');
class EndTitleBlock extends Inline {

  static create(value) {
    const node = super.create();
    node.setAttribute('class', 'end-title');
    return node;
  }
}

EndTitleBlock.blotName = 'end-title';
EndTitleBlock.tagName = 'div';
Quill.register(EndTitleBlock);


@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss']
})
export class EditorLayoutComponent implements OnInit {

  layoutEditor;
  placeholderLayout = 'Dodaj zdjęcię i nagłówek';
  blured = false;
  focused = false;
  editorInstance: any;
  editorForm: FormGroup;
  contentView;
  editor;
  modulesLayout = {};

  toolbarOptions =
    [
      ['bold', 'italic'],        // toggled buttons
      [{ header: 2 }],               // custom button values
      [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction
      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image'],
    ];

  editorLayoutStyle = {
    minHeight: '165px',
    backgroundColor: '#fff'
  };


  imageHandler = {
    image: () => {
      const range = this.editorInstance.getSelection();
      const value = prompt('What is the image URL');
      if (value) {
        this.editorInstance.insertEmbed(range.index, 'image', value, 'user');
      }
    }
  };

  ngOnInit() {
    this.editorForm = new FormGroup({
      layoutEditor: new FormControl(null)
    });
    this.modulesLayout = {
      imageResize: {},
      imageDrop: {},
      toolbar: {
        container: this.toolbarOptions,
        // handlers: this.imageHandler
      }
    };
  }

  created(event) {
    this.editorInstance = event;
    // this.editorInstance.format('align', 'right');
    // this.editorInstance.insertText(0, 'Test', {
    //   color: '#AD4F18',
    //   size: 'large'
    // }, 'user');
    console.log('editor-created', event);
  }

  changedEditor(event) {
    // this.editor = event;
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  ContentChanged(event) {
    this.contentView = event.content;
    this.editor = event;
    console.log('Conten changed in editorLayout', this.editor);
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur(event) {
    // tslint:disable-next-line:no-console
    console.log('blur', event);
    this.focused = false;
    this.blured = true;
    // event.editor.insertText(event.editor.getLength(), 'Test', {
    //     color: '#AD4F18',
    //     size: 'large'
    //   }, 'user');

  }

  onView() {
    console.log(this.editorForm.get('layoutEditor').value);
    console.log('Oject editor from after content chanded: ');
    console.log(this.editor);
  }


}
