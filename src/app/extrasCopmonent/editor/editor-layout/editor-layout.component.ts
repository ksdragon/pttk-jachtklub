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
  editorInstance: Quill;
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
      ['link', 'image', 'routerLinkImage'],
    ];

  editorLayoutStyle = {
    minHeight: '165px',
    backgroundColor: '#fff'
  };


  imageHandler = {
    routerLinkImage: () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const fd = new FormData();
        fd.append('image', file);
        const range = this.editorInstance.getSelection(true);
        console.log('fd', fd.get('image'));
        this.editorInstance.insertEmbed(range.index, 'routerLinkImage'
          , {
            src: `${window.location.origin}/assets/images/test/` + file.name,
            routerLink: '/article/0'
          },
          'user'
        );
      };
    },
    // image: () => {
    //   // Save current cursor state
    //   const range = this.editorInstance.getSelection(true);
    //   const value = prompt('What is the image URL');
    //   if (value) {
    //     this.editorInstance.insertEmbed(range.index, 'image', value, 'user');

    //   }
    // }
  };


imageHandler2 = {
  image: () => {
    // Save current cursor state
    const range = this.editorInstance.getSelection(true);
    const value = prompt('What is the image URL');
    if (value) {
      this.editorInstance.insertEmbed(range.index, 'image', value, 'user');

    }
  }
};

imageHandler1 = () => {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    // const formData = new FormData();

    // formData.append('image', file);
    // setTimeout(() => {
    // }, 3000);
    // Save current cursor state
    const range = this.editorInstance.getSelection(true);

    // Insert temporary loading placeholder image
    this.editorInstance.insertEmbed(range.index, 'image', `${window.location.origin}/assets/images/social/facebook.png`);

    // Move cursor to right side of image (easier to continue typing)
    // this.editorInstance.setSelection(range.index + 1);

    // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
    const res = await this.saveToServer(file);

    // Remove placeholder image
    this.editorInstance.deleteText(range.index, 1);

    // Insert uploaded image
    this.editorInstance.insertEmbed(range.index, 'image', `${window.location.origin}` + res);
  };
}

test() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const fd = new FormData();
    fd.append('image', file);
    const range = this.editorInstance.getSelection(true);
    console.log('fd', fd.get('image'));
    this.editorInstance.insertEmbed(range.index, 'routerLinkImage'
      , {
        src: `${window.location.origin}/assets/images/test/` + file.name,
        routerLink: '/article/0',
        style: 'display: inline; margin: 0px 1em 1em 0px; float: left;',
      },
      'user'
    );
  };

}

/*
* Step2. save to server
*
* @param {File} file
*/
saveToServer(file: File) {
  const fd = new FormData();
  fd.append('image', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${window.location.origin}/assets/images`, true);
  // xhr.open('POST', 'http://localhost:3000/upload/image', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // this is callback data: url
      const url = JSON.parse(xhr.responseText).data;
      // insertToEditor(url);
    }
  };
  xhr.send(fd);
}

ngOnInit() {
  this.editorForm = new FormGroup({
    layoutEditor: new FormControl(null)
  });
  this.modulesLayout = {
    imageResize: {},
    imageDrop: {},
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 240, // default
      imageType: 'image/jpeg', // default
      debug: true, // default
      routerLink: '/article/0',
      style: 'display: inline; margin: 0px 1em 1em 0px; float: left;'
    },
    toolbar: {
      container: this.toolbarOptions,
      handlers: this.imageHandler
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
  // console.log('editor-created', event);
}

changedEditor(event) {
  // this.editor = event;
  // tslint:disable-next-line:no-console
  // console.log('editor-change', event);
}

ContentChanged(event) {
  this.contentView = event.content;
  this.editor = event;
  // console.log('Conten changed in editorLayout', this.editor);
}

focus($event) {
  // tslint:disable-next-line:no-console
  // console.log('focus', $event);
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
