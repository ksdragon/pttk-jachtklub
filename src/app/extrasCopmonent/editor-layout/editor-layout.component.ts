import { FormControl, FormGroup, ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  // viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
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
    [ { header: 2 }],               // custom button values
    [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
    [{ direction: 'rtl' }],                         // text direction
    [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
    ['image'],
  ];

  editorLayoutStyle = {
    minHeight: '165px',
    maxWidth: '700px',
    backgroundColor: '#fff'
  };

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

  // onSubmit() {
  //   console.log(this.editorForm.get('layoutEditor').value);
  //   console.log('Oject editor from after content chanded: ');
  //   console.log(this.editor);
  // }


  ngOnInit() {
    this.editorForm = new FormGroup({
      layoutEditor: new FormControl(null)
    });
    this.modulesLayout = {
      imageResize: {},
      imageDrop: {},
      toolbar: {
        container: this.toolbarOptions
      }
    };
  }

}
