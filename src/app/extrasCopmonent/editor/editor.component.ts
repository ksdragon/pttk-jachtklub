import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

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
